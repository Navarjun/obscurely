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
        let upvoted = this.comment.votes.indexOf(DH.loggedInUser()) !== -1;
        return `
            <div class="comment">
                <div class="img-div">
                    <img class="profile-img" src="./images/${this.comment.user.profilePic}" alt=""/>
                    <div class="line ${ this.children.length && visibleRepliesCount ? 'visible' : '' }"></div>
                </div>
                <div class="comment-content">
                    <span class="author">${this.comment.user.firstName} ${this.comment.user.lastName}</span>
                    <span class="time text-muted">• ${agoFormat(this.comment.createdAt)}</span>
                    <p class="comment-text">
                        ${this.comment.text}
                    </p>
                    <div class="comment-interaction">
                        <button data-comment="${this.comment.id}"
                            class="btn btn-secondary upvote ${upvoted ? 'highlighted' : ''}">
                            Upvote<span>d</span>
                        </button>
                        <button class="btn btn-secondary">Reply</button>
                    </div>
                    ${ visibleRepliesCount ? childrenHTML() : '' }
                </div>
            </div>
        `;
    }
}

function bindEvents() {
    document.getElementById('logged-in-user')
        .addEventListener('click', async function(e) {
            e.preventDefault();
            // change logged in user randomly
            let user = await DH.loginWithRandom();
            updateLogin();
            loadInterface();
        });

    document.getElementById('create-comment')
        .addEventListener('click', async function(e) {
            e.preventDefault();
            
            let input = document.getElementById('comment-input');
            if (input.value && input.value !== '') {
                let comment = await DH.addComment(input.value);
                if (comment) {
                    loadInterface();
                }
            }
        })
}

function bindUpvoteEvents() {
    Array.from(document.getElementsByClassName('upvote'))
        .forEach(function(btn) {
            btn.addEventListener('click', async function(e) {
                e.preventDefault();
                if (this.dataset.comment && this.dataset.comment !== '') {
                    let comment = await DH.upvote(this.dataset.comment);
                    if (comment) {
                        loadInterface();
                    }
                }
            })
        })
}

function updateLogin() {
    let userId = DH.loggedInUser();
    if (userId && userId !== '') {
        let user = DH.userFromId(userId);
        document.getElementById('logged-in-user')
            .setAttribute('src', `./images/${user.profilePic}`)
    }
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