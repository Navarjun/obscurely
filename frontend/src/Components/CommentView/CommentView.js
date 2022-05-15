import './CommentView.scss';
import CommentList from '../CommentList/CommentList';

function CommentView(props) {
    let comment = props.comment;

    let repliesChild = null;
    if (comment.children) {
        repliesChild = <div className="subcomments">
                <CommentList comments={comment.children}></CommentList>
            </div>
    }

    return (
        <div className="comment">
            <div className="img-div">
                <img className="profile-img" src={`./images/${comment.user.profilePic}`} alt=""/>
                <div className={ repliesChild ? 'line visible' : 'line' }></div>
            </div>
            <div className="comment-content">
                <span className="author">{comment.user.firstName + ' ' + comment.user.lastName}</span>
                <span className="time text-muted">• {agoFormat(comment.createdAt)}</span>
                <p className="comment-text">
                    {comment.text}
                </p>
                <div className="comment-interaction">
                    <button className="btn btn-secondary">&#9650; Upvote</button>
                    <button className="btn btn-secondary">Reply</button>
                </div>
                {repliesChild}
            </div>
        </div>
    );
}

function agoFormat(date) {
    if (typeof date === 'string' || date instanceof String) {
        date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.valueOf())) {
        // so the interface doesn't show something undesired
        return '';
    }

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

export default CommentView;