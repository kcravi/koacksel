import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import NavBar from '../components/NavBar';
import ChatContainer from './ChatContainer';
import ChatShowContainer from './ChatShowContainer';

// <IndexRoute component={ChatContainer}/>
const App = props => {
  return(
    <Router history={browserHistory}>
      <Route path='/' component={ChatContainer}>
        <Route path="/chats/:id" component={ChatShowContainer} />
      </Route>
    </Router>
  )
}

export default App;
