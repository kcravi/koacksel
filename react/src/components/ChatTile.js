import React from 'react';
import { Link } from 'react-router'

const ChatTile = props => {

  let onClick = () => {
    if (window.confirm(`Are you sure you want to delete this ChatRoom ${props.title}?`)) {
      props.handleDelete()
    }
  }
  let deleteButton = <i className="fa fa-times-circle delete-icon" aria-hidden="true" onClick={onClick} ></i>

  return(
    <div className='panel callout radius chat'>
      <Link to={`/chats/${props.id}`} >
        Chatroom: {props.title}
      </Link>
      {deleteButton}
    </div>
  );
};

export default ChatTile;
