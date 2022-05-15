import './CommentList.scss';
import CommentView from '../CommentView/CommentView';

function CommentList(props) {
    let comments = props.comments || [];

    let child = <div className="no-comments"> No Comments! </div>;

    if (comments && comments.length) {
        child = comments.map(comment => {
            return <CommentView
                key={comment.id}
                comment={comment}
                onVoteChange={props.onVoteChange}></CommentView>
        });
    }

    return (
        <>
            {child}
        </>
    );
}

export default CommentList;