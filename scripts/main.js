const data = {};
data.users = {};
data.comments = [];

// ENTRY POINT
loadData();

// THE COMMENT CLASS
function Comment(data, visibleRepliesCount = 1) {
    this.comment = data;
    this.children = data.children ? data.children : [];

    const childrenHTML = () => {
        let data = this.children.length > visibleRepliesCount
            ? this.children.slice(0, visibleRepliesCount)
            : this.children;

        let subcommentsHTML = data.map(d => {
            let comment = new Comment(d, d.children, visibleRepliesCount - 1);
            return comment.html();
        }).join('');

        if (subcommentsHTML !== '') {
            subcommentsHTML = `<div class="subcomments">${subcommentsHTML}</div>`;
        }
        return subcommentsHTML;
    };

    this.html = () => {
        return `
            <div class="comment">
                <div class="img-div">
                    <img class="profile-img" src="./images/${this.comment.user.profilePic}" alt=""/>
                    <div class="line ${ this.children.length && visibleRepliesCount ? 'visible' : '' }"></div>
                </div>
                <div class="comment-content">
                    <span class="author">${this.comment.user.firstName} ${this.comment.user.lastName}</span>
                    <span class="time text-muted">• ${agoFormat(this.comment.date)}</span>
                    <p class="comment-text">
                        ${this.comment.text}
                    </p>
                    <div class="comment-interaction">
                        <button class="btn btn-secondary">&#9650; Upvote</button>
                        <button class="btn btn-secondary">Reply</button>
                    </div>
                    ${ visibleRepliesCount ? childrenHTML() : '' }
                </div>
            </div>
        `;
    }
}

// FUNCTION TO VIEW THE INTERFACE ONCE THE DATA HAS LOADED
function loadInterface() {
    // console.log(data);
    let commentsHTML = data.comments.map(d => {
            let comment = new Comment(d);
            // console.log(comment);
            return comment.html();
        })
        .join('<br/>');

    document.getElementById('comments').innerHTML = commentsHTML;

}

function loadData() {
    // This will eventually be coming from an API
    // an asynchronous call
    sampleData.users.forEach(user => {
        data.users[user.id] = Object.assign({}, user);
    });

    sampleData.comments
        .map(comment => {
            comment.date = new Date(comment.date);
            comment.user = data.users[comment.user];
            return comment;
        })
        .filter(d => !d.parent)
        .forEach(comment => {
            let obj = Object.assign({}, comment);
            obj.children = sampleData.comments.filter(d => d.parent === obj.id);

            if (obj.parent) {
                sampleData.comments.filter(d => d.id === obj.parent);
            }

            data.comments.push(obj);
        });

    loadInterface();
}

function agoFormat(date) {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}