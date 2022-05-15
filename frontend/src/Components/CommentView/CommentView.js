import './CommentView.scss';
import { useContext } from 'react'
import { UserContext } from '../../Helpers/ContextHelper';
import CommentList from '../CommentList/CommentList';
import DH from '../../Helpers/DataHelper';

function CommentView(props) {
    const comment = props.comment;
    const loggedInUser = useContext(UserContext);

    const repliesChild = null;
    if (comment.replies) {
        repliesChild = <div className="subcomments">
                <CommentList comments={comment.replies}
                    onVoteChange={props.onVoteChange}></CommentList>
            </div>
    }

    let upVoteClasses = 'btn btn-secondary upvote';
    if (loggedInUser && comment.votes.indexOf(loggedInUser.id) !== -1) {
        upVoteClasses += ' highlighted';
    }

    const toggleVote = async (e) => {
        e.preventDefault();
        if (comment.votes.indexOf(loggedInUser.id) === -1) {
            // not voted
            await DH.upvote(comment.id);
        } else {
            await DH.removeUpvote(comment.id);
        }
        if (props.onVoteChange) {
            props.onVoteChange(comment);
        }
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
                    <button className={upVoteClasses} onClick={toggleVote}>Upvote</button>
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