import './CreateComment.scss';

function CreateComment() {
    return (
        <div className="create-comment">
            <img id="logged-in-user" className="profile-img" src="./images/Rob.png"/>
            <input id="comment-input" className="comment-input" type="text"/>
            <button id="create-comment" className="btn create-comment">Comment</button>
        </div>
    );
}

export default CreateComment;