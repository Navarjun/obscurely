import './CreateComment.scss';

import { useState, useContext, useRef } from 'react';
import { UserContext } from '../../Helpers/ContextHelper';
import DH from '../../Helpers/DataHelper';

function CreateComment(prop) {
    /**
     * Expects:
     *  prop.onCommentCreated = (newComment) => {}
     */
    const loggedInUser = useContext(UserContext);
    const [text, setText] = useState('');
    const [btnActive, setBtnActive] = useState(true);

    const updateText = (e) => {
        setText(e.target.value);
    }

    const addComment = async (e) => {
        e.preventDefault();
        if (text !== '' && text.trim() !== '') {
            // A loader should be added
            setBtnActive(false);
            let comment = await DH.addComment(text);
            setBtnActive(true);
            setText('');
            if (prop.onCommentCreated) {
                prop.onCommentCreated(comment);
            }
        }
    }

    const loginRandomUser = async (e) => {
        await DH.loginWithRandom();
        if (prop.onUserChange) {
            prop.onUserChange();
        }
    }

    return (
        <div className="create-comment">
            <img id="logged-in-user" className="profile-img"
                src={loggedInUser ? `./images/${loggedInUser.profilePic}` : ''}
                onClick={loginRandomUser}/>

            <input id="comment-input" className="comment-input"
                type="text" placeholder="Add a comment…"
                value={text}
                onChange={updateText}/>

            <button id="create-comment" className="btn create-comment"
                onClick={addComment} disabled={!btnActive}>Comment</button>
        </div>
    );
}

export default CreateComment;