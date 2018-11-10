import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import ChatContainer from './containers/ChatContainer';
import App from './containers/App'

$(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});
