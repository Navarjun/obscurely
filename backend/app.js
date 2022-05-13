const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = 3000;

require('./models/db-connection');
const models = require('./models/models');
const { model } = require('mongoose');


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    // check if client sent cookie
    const cookie = req.cookies.user;

    if (cookie === undefined) {

        models.user.count()
            .then(count => {
                const random = Math.floor(Math.random() * count);
                models.user.findOne({}, {skip: random})
                    .then(user => {
                        console.log('Setting Cookie with User:', user._id.toString());
                        res.cookie('user', user._id.toString());
                        next();
                    })
                    .catch(err => {
                        console.log(err);
                        next();
                    });
                })
            .catch(err => {
                console.log(err);
                next();
            });

    } else {
        // yes, cookie was already present 
        console.log('cookie exists', cookie);
        next();
    }
})

app.post('/login', (req, res) => {
        let userId = req.body.userId;

        models.user.findOne({_id: userId})
            .then(user => {
                if (user) {
                    res.cookie('user', userId);
                    res.status(200).send(user);
                } else {
                    res.status(400).send({message: 'Login Failed', description: 'UserId requested doesn\'t exist'});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({message: 'Database Error', description: 'Database is facing some issues'})
            })
});

app.post('/create/:type', (req, res) => {
    // comments or votes
    const type = req.params.type;
    let data = req.body;

    let userId = req.cookies.user;
    if (userId) {
        switch (type) {
            case 'comment':
                if (!(data && data.text)) {
                    res.status(400).send({message: 'Failed to save comment', description: 'Some data might have been missing'})
                    return;
                }
                data.user = userId;
                models.comment.create(data)
                    .then(async (comment) => {
                        comment = await comment.populate('user');
                        res.status(201).send(comment);
                    })
                    .catch(err => {
                        res.status(400).send({message: 'Failed to save comment', description: 'Some data might have been missing', err: err})
                    });
                break;
    
            case 'vote':
                if (!(data && data.commentId)) {
                    res.status(400).send({message: 'Failed to upvote comment', description: 'Some data might have been missing'})
                    return;
                }
                let commentId = data.commentId;
                models.comment.findOne({_id: commentId})
                    .then(comment => {
                        if (comment.votes.map(d => d.toString()).indexOf(userId) !== -1) {
                            // commnt already upvoted by the user
                            res.status(200).send(comment);
                        } else {
                            models.comment.update(commentId, {$push: {votes: userId}})
                                .then((updatedComment) => {
                                    res.status(200).send(updatedComment);
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).send({message: 'DB Error', description: 'Database had issues saving the vote'});
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).send({message: 'DB Error', description: 'Database is facing some issues'});
                    })
                break;
        }
    } else {
        res.status(400).send({message: 'Failed to save comment', description: 'You must be logged in for this'})
    }
});

app.get('/get/:type', (req, res) => {
    // COMMENTS (OR VOTES)
    const type = req.params.type;
    const data = req.body;

    let model;
    switch (type) {
        case 'comment':
            model = models.comment;
            break;
        case 'user':
            model = models.user;
            break;
    }

    if (model) {
        model.find(data)
            .then(docs => res.status(201).send(docs.map(d => d.toJSON())))
            .catch(err => res.status(500).send(err));
    } else {
        res.status(400).send({});
    }

});

app.put('/update', (req, res) => {
    // comments
    // NOT NEEDED FOR ASSIGNMENT
});

app.delete('/delete/:type', (req, res) => {
    // votes
    const type = req.params.type;
    const data = req.body;

    switch(type) {
        case 'vote':
            if (data.commentId && req.cookies.user) {
                let commentId = data.commentId;
                let userId = req.cookies.user;
                if (userId) {
                    models.comment.update(commentId, {$pull: {votes: userId}})
                        .then((updatedComment) => {
                            res.status(200).send(updatedComment);
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).send({message: 'DB Error', description: 'Database is facing some issues'});
                        })
                } else {
                    res.status(400).send({message: 'Not logged in', description: 'You need to login to perform this action'});
                }
            } else {
                res.status(400).send({message: 'Bad Request', description: 'Comment Id and logged in user required for upvoting'});
            }
            break;
        default:
            res.status(400).send({message: 'Bad Request', description: 'Request not allowed'});
            break;
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})