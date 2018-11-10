import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Link } from 'react-router'

import Message from '../components/Message';
import TextFieldWithSubmit from '../components/TextFieldWithSubmit';

class ChatShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: '',
      user: '',
      newMessage: '',
      newMessages: [],
      oldMessages: [],
      currentUserUsername: '',
      createdAt: ''
    }
    this.handleMessageReceipt = this.handleMessageReceipt.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
    fetch(`/api/v1/chats/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((body) => {
      debugger
      this.setState({
        chat: body.chat[0],
        oldMessages: body.messages,
        currentUserUsername: body.current_user_username,
        createdAt: body.created_at
      })
    })

    fetch('/api/v1/users', {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((data) => {
      this.setState({user: data})
    })

    App.chatChannel = App.cable.subscriptions.create(
      // console.log(this.props.params.id)
      // Info that is sent to the subscribed method
      {
        channel: "ChatChannel",
        chat_id: this.props.params.id
      },
      {
        connected: () => console.log("ChatChannel connected"),
        disconnected: () => console.log("ChatChannel disconnected"),
        received: data => {
          // Data broadcasted from the chat channel
          // console.log(data)
          this.handleMessageReceipt(data)
        }
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // prob: once the showpage loaded, the other showpages wudn't load.
    //       "new props.params.id" changes but the state would not change.
    // sol: it compares the prevprops with newProps, refetch the data and
    //      helps change the state of clicked showpage and load its contents.
    if (prevProps.params.id !== this.props.params.id) {
      this.fetchData();
    }
  }

  handleMessageReceipt(data) {
    this.setState({
      newMessages: this.state.newMessages.concat(data)
    })
  }

  handleClearForm() {
    this.setState({
      newMessage: ''
    })
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let prepMessage = this.state.newMessage
    let user_info = this.state.user

    // Send info to the receive method on the back end
    App.chatChannel.send({
     message: prepMessage,
     user: user_info
    })
    this.handleClearForm();
  }

  handleMessageChange(event) {
    this.setState({ newMessage: event.target.value }) 
  }

  render() {
    let allMessages = this.state.oldMessages.concat(this.state.newMessages)

    // prob: new-message was being refetched due to componentDidUpdate call
    // sol: it helps filter out the duplicate msg, returned only unique set of message objects
    Array.prototype.filteredMessages = function() {
        let object = {}, result = [], key;
        for ( let i = 0; i < this.length; i++ ) {
            key = JSON.stringify(this[i]);
            if ( !object.hasOwnProperty(key) ) {
                object[key] = true;
                result.push(this[i]);
            }
        }
        return result;
    }

    let filteredMessages = allMessages.filteredMessages();

    let formattedDates = []
    let formattedDate = ''
    let messages = filteredMessages.map(message => {
      let a = new Date(message.created_at).toDateString()
      if (formattedDates.indexOf(a) == -1){
        formattedDates.push(a)    // helps select 1st message of the day and print that date.
        formattedDate = a         // if its 1st message of the day, its assigned the created date itself
      } else {                    // else placeholder "x"
        formattedDates.push('x')
        formattedDate = 'x'
      }

      if (this.props.params.id == message.chat_key) { //prob: new msg was subscribed to all chatroom
        return(                                       // sol: it make sure the msg belongs to the specific chatroom
          <Message
            key={message.messageId}
            id={message.messageId}
            username={message.user.username}
            icon={message.user.icon_num}
            message={message.message}
            font={message.font}
            currentUserUsername={this.state.currentUserUsername}
            createdAt={message.created_at}
            formattedDate={formattedDate}
          />
        )
       }
     })

     let currentUserUsername = this.state.currentUserUsername
     let title = this.state.chat.title

     let x = ''
     let a = b => {
       b.forEach(user => {
         if (currentUserUsername.indexOf(user.user.username) == -1){
           x = user.user.username
         }
       })
       return x
     }

     if (title == currentUserUsername){
       title = a(this.state.chat.chatroom_users)
     }

    return(
      <div>
        <h3 className="chat-show-title">ChatRoom: {title}</h3>
        <div className='callout chat-show' id='chatWindow'>
          {messages}
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <TextFieldWithSubmit
            content={this.state.newMessage}
            name='message'
            handlerFunction={this.handleMessageChange}
          />
        </form>
      </div>
    );
  }
}

export default ChatShowContainer;
