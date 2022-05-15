import './styles/common.scss';
import './styles/App.scss';

import { UserContext } from './Helpers/ContextHelper';
import DH from './Helpers/DataHelper';
import { useEffect, useState, useRef } from 'react';
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


  // HTTP Polling Code
  // (Websockets is also an option, more efficient probably)
  // Since this is not a chat app, HTTP Polling should be good enough
  // polling every 5 seconds after the last update
  const pollTime = 5000,
    [pollCount, setPollCount] = useState(0);
    // using state for this because useEffect hooks only get triggered when state changes
  const httpPollForComments = () => {
    loadComments()
      .then(() => { setPollCount(pollCount + 1); })
      .catch(err => { /** Error handling is not in the scope of` the pro`ject */});
  };

  let interval = useRef(null);
  useEffect(() => {
    // clearing previous timeout if any
    interval.current && clearTimeout(interval.current);
    interval.current = setTimeout(httpPollForComments, pollTime);

    return () => { interval.current && clearTimeout(interval.current); }
  }, [pollCount])


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
