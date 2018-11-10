import React from 'react';

const NewChatTile = props => {
    // <label htmlFor={props.name}>{props.label}</label>
  return (
    <div className='input-group' >
      <input
        className='input-group-field'
        type='text'
        placeholder="Title"
        name={props.name}
        onChange={props.handlerFunction}
        value={props.content}
      />
      <div className='input-group-button'>
        <input type='submit' className='button small' value='Create ChatRoom' />
      </div>
    </div>
  );
}

export default NewChatTile;
