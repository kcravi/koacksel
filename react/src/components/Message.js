import React from 'react';
import { railsAssetImagePath } from '../constants/railsAssetImagePath';

const Message = props => {

  function formatDate(date) {
    // return date/month and time of each message
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const dayNames = [
      "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ]

    let day = date.getDate();
    let dayIndex = date.getDay()
    let monthIndex = date.getMonth();
    let time = date.toLocaleTimeString();

    return `${dayNames[dayIndex]} ${monthNames[monthIndex]} ${day}, ${time}`;
  }

  let createdDate = props.createdAt.substring(0, 10);
  let formattedDateTime = formatDate(new Date(createdDate));

  //return date/month/year for only 1st message of the day
  let formattedDate=''
  if (props.formattedDate!='x'){
    formattedDate=`*** ${props.formattedDate} ***`
  }

  if (formattedDate){
    formattedDate =  <div className="text-center msg-date"><em>{formattedDate}</em></div>
  }
  // bold new messages
  // ????  double check in production mode ????
  let message = ''
  if (props.font == 'bold'){
    message = <strong>{props.message}</strong>
  } else {
    message = props.message
  }

  // print current_user messages in right side of the chatbox.
  // while everyone else printed on left side
  let msg = ''
  if (props.currentUserUsername === props.username){
    msg = <span className='right'>
            <span className='callout msg-border-right'>
              {message}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="user">
              <em> {props.username}</em>
            </span>
            <img src={railsAssetImagePath(`chat_image_${props.icon}`)} width="35"/>
          </span>
  } else {
    msg = <span>
            <img src={railsAssetImagePath(`chat_image_${props.icon}`)} width="35"/>
            <span className="user">
              <em> {props.username} </em>
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className='msg-border-left'>
              {message}
            </span>
          </span>
  }

  return(
    <div>
      <br/>
        {formattedDate}
        { msg}
      <br/>
    </div>
  );
};

export default Message;
