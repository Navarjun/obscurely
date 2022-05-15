import './CommentView.scss';
import { useContext, useState } from 'react'
import { UserContext } from '../../Helpers/ContextHelper';

import CommentList from '../CommentList/CommentList';
import CreateComment from '../CreateComment/CreateComment';
import DH from '../../Helpers/DataHelper';

function CommentView(props) {
    /**
     * Expected:
     * props.comment (required): comment object
     * props.onCommentChange (optional): callback if a comment changes
     */
    const comment = props.comment;
    const loggedInUser = useContext(UserContext);
    const [replyVisible, setReplyVisible] = useState(false);

    let repliesChild = null;
    let replies = comment.replies;
    if (replies) {
        repliesChild = <div className="subcomments">
                <CommentList comments={[...replies].reverse()}
                    onCommentChange={props.onCommentChange}></CommentList>
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
        if (props.onCommentChange) {
            props.onCommentChange(comment);
        }
    }

    const toggleReplyView = (e) => {
        e && e.preventDefault();
        setReplyVisible(!replyVisible);
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
                    <button className={upVoteClasses} onClick={toggleVote}>vote</button>
                    <button className="btn btn-secondary" onClick={toggleReplyView}>Reply</button>
                    { replyVisible
                        ? <CreateComment
                            parent={comment.id}
                            onCommentCreated={(comment) => {toggleReplyView(); props.onCommentChange(comment);}}
                            ></CreateComment>
                        : null
                    }
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