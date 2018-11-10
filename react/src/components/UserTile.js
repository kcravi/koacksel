import React from 'react';

const UserTile = props => {
  return(
    <div className="panel callout users" onClick={props.handlerFunction}>
      <li>{props.username}</li>
    </div>
  );
};

export default UserTile;
