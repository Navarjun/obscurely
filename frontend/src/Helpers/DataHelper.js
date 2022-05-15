const baseUrl = '/api/';

function DataHelper() {

    this.loggedInUser = () => {
        let cookie = getCookie('user');
        if (cookie && this.users[cookie]) {
            return this.users[cookie];
        }
        return null;
    }
    this.users = {};
    this.comments = [];
    this._commentsMap = {};
    
    this.loginWithRandom = async() => {
        let userIds = Object.keys(this.users);
        if (!userIds.length) {
            await this.loadUsers();
            userIds = Object.keys(this.users);
        }
        let random = Math.floor(Math.random() * userIds.length);
        let user = await request('POST', 'login', {userId: userIds[random]});
        return user;
    }

    this.loadUsers = async() => {
        let users = await request('GET', 'get/user');
        if (users instanceof Array) {
            users.forEach(user => {
                this.users[user.id] = user;
            });
        }
    };

    this.loadComments = async() => {
        let comments = await request('GET', 'get/comment');
        this._organiseComments(comments);
        return this.comments;
    }

    this.loadData = async() => {
        await this.loadUsers();
        await this.loadComments();
    }

    this.upvote = async(commentId) => {
        let comment = await request('POST', 'create/vote', {commentId});
        if (comment) {
            this._commentsMap[comment.id].votes = comment.votes;
        }
        return comment;
    }
    this.removeUpvote = async(commentId) => {
        let comment = await request('DELETE', 'delete/vote', {commentId});
        if (comment) {
            this._commentsMap[comment.id].votes = comment.votes;
        }
        return comment;
    }

    this.addComment = async(text, parent = null) => {
        let comment = await request('POST', 'create/comment', {text, parent});
        if (comment) {
            comment.createdAt = new Date(comment.createdAt);
            if (!comment.parent) {
                this.comments.push(comment);
            } else if (this._commentsMap[comment.parent]) {
                if(!this._commentsMap[comment.parent].replies) {
                    this._commentsMap[comment.parent].replies = [];
                }
                this._commentsMap[comment.parent].replies.push(comment);
            }
        }
        return comment;
    }

    this.userFromId = (id) => {
        return this.users[id];
    }

    this._organiseComments = (comments) => {
        if (!comments) {
            comments = Object.values(this._commentsMap);
        }
        comments.forEach(comment => {
            comment.createdAt = new Date(comment.createdAt);
            this._commentsMap[comment.id] = comment;
        });
        // Ideally this should happen on the backend in a DB Query
        comments.map(comment => {
            if (comment.parent) {
                if (!this._commentsMap[comment.parent].replies) {
                    this._commentsMap[comment.parent].replies = [];
                }
                this._commentsMap[comment.parent].replies.push(comment);
            }
        });
        this.comments = [];
        this.comments = comments.filter(c => !c.parent).sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf());
    }

    return this;
}

function request(method, uri, data = {}) {

    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open(method, baseUrl + uri);

        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        request.onload = () => {
            resolve(JSON.parse(request.response));
        };
        request.onerror = (err) => {
            // not in the scope of the project
            reject(err);
        };
        request.send(JSON.stringify(data));
    });

}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

const DH = new DataHelper();
export default DH;