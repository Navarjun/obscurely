import './styles/common.scss';
import './styles/App.scss';

import {CreateComment, CommentList} from './Components/Components';

function App() {
  return (
    <>
      <h2>Discussion</h2>
      <CreateComment></CreateComment>
      <hr className="seperator"/>
      <CommentList></CommentList>
    </>
  );
}

export default App;
