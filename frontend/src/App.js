import './styles/common.scss';
import './styles/App.scss';

import { UserContext } from './Helpers/ContextHelper';
import DH from './Helpers/DataHelper';
import { useEffect, useState } from 'react';
import { CreateComment, CommentList } from './Components/Components';

function App() {

  const [loggedInUser, setLoggedInUser] = useState(DH.loggedInUser());
  const [comments, setComments] = useState([...DH.comments]);

  const loginWithRandom = async function() {
      await DH.loginWithRandom();
      setLoggedInUser({...DH.loggedInUser()});
  };
  const loadComments = async function() {
      await DH.loadComments();
      setComments([...DH.comments]);
  };

  const commentsUpdated = () => {
    setComments([...DH.comments]);
  };
  const userChanged = () => {
    setLoggedInUser({...DH.loggedInUser()});
  };

  useEffect(() => {
    loginWithRandom();
    loadComments();
  }, []);


  return (
    <UserContext.Provider value={loggedInUser}>
      <h2>Discussion</h2>
      <CreateComment onCommentCreated={commentsUpdated} onUserChange={userChanged}></CreateComment>
      <hr className="seperator"/>
      <CommentList
        comments={[...comments].reverse()}
        onCommentChange={commentsUpdated}></CommentList>
    </UserContext.Provider>
  );
}

export default App;
