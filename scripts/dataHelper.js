const baseUrl = '/api/';

function DataHelper() {

    this.loggedInUser = () => getCookie('user');
    this.users = {};
    this.comments = [];
    
    this.loginWithRandom = async() => {
        let userIds = Object.keys(this.users);
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
        this.comments = comments.map(comment => {
            comment.createdAt = new Date(comment.createdAt);
            return comment;
        });
    }

    this.loadData = async() => {
        await this.loadUsers();
        await this.loadComments();
    }

    this.upvote = async(commentId) => {
        let comment = await request('POST', 'create/vote', {commentId});
        if (comment) {
            this.comments.filter(d => comment.id === d.id)
                .forEach(d => {
                    d.votes = comment.votes;
                });
        }
        return comment;
    }
    this.removeUpvote = async(commentId) => {
        let comment = await request('DELETE', 'delete/vote', {commentId});
        if (comment) {
            this.comments.filter(d => comment.id === d.id)
                .forEach(d => {
                    d.votes = comment.votes;
                });
        }
        return comment;
    }

    this.addComment = async(text) => {
        let comment = await request('POST', 'create/comment', {text});
        if (comment) {
            comment.createdAt = new Date(comment.createdAt);
            this.comments.push(comment);
        }
        return comment;
    }

    this.userFromId = (id) => {
        return this.users[id];
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