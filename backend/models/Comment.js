const mongoose = require('mongoose');
const methods = require('./model-methods');
const modelName = 'Comment';

const schema = new mongoose.Schema({
    text: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    votes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []
    }
}, {timestamps: true});

let model = mongoose.model(modelName, schema);

methods(model, schema);

schema.find = function(query) {
    return new Promise((resolve, reject) => {
        model.find(query).populate('user')
            .then(async function(docs) {
                resolve(docs);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = schema;