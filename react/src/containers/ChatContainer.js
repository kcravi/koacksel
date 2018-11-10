import React, { Component } from 'react';
import { Link } from 'react-router';
import BackButton from '../components/BackButton.js';
import { browserHistory } from 'react-router';

import ChatTileContainer from './ChatTileContainer';
import NewChatFormContainer from './NewChatFormContainer';
import UserIndexContainer from './UserIndexContainer';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      generalChats: [],
      privateChats: [],
      // user: {},
      users: [],
      currentUser: null
    }
    this.addChatRoom = this.addChatRoom.bind(this);
    this.deleteChatRoom = this.deleteChatRoom.bind(this);
    this.usernameHandles = this.usernameHandles.bind(this);
  }

  // componentDidMount(){
  //   Promise.all([
  //     fetch('/api/v1/chats.json', {
  //         credentials: 'same-origin',
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' }
  //       }),
  //     fetch('/api/v1/users.json', {
  //         credentials: 'same-origin',
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' }
  //       })
  //   ])
  //   .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
  //   .then(([data1, data2]) => this.setState({
  //       generalChats: data1.general_chats,
  //       privateChats: data1.private_chats,
  //       currentUser: data1.current_user[0],
  //       users: data2.users
  //   }));
  // }

  componentDidMount() {
    fetch('/api/v1/chats', {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((body) => {
      this.setState({
        generalChats: body.general_chats,
        privateChats: body.private_chats,
        currentUser: body.current_user[0]
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
    // .then(()=> {
    fetch('/api/v1/users', {
      credentials: 'same-origin',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then((body) => {
      this.setState({
        users: body.users
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))

    // })
  }

  addChatRoom(payload) {
    fetch("/api/v1/chats.json", {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then((body) => {
      if (body.errors){
        alert(`chatroom title "${body.title}" ${body.errors.title[0]}`)
      } else {
        if (this.usernameHandles(body.chat.title)){
          this.setState({ privateChats: this.state.privateChats.concat(body.chat) })
        } else {
          this.setState({ generalChats: this.state.generalChats.concat(body.chat) })
        }
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  usernameHandles(chatTitle){
    let titles = this.state.users.map(user=>{
      return user.username
    })
    if (titles.includes(chatTitle)){
      return true
    }
  }

  deleteChatRoom(chatId){
    let payload = {
      chatId: chatId
    }
    fetch(`/api/v1/chats/${chatId}.json`, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json',
      'X-Requested-With': 'XHMLttpRequest' }
    })
    .then((response) => {
      let { ok } = response;
      if (ok) {
        return response.json();
      }
    })
    .then((body) => {
      let newGeneralChats = this.state.generalChats.filter(chat=> {
        return body.chat.id != chat.id
      })
      let newPrivateChats = this.state.privateChats.filter(chat=> {
        return body.chat.id != chat.id
      })
      this.setState({
        generalChats: newGeneralChats,
        privateChats: newPrivateChats
      })
      browserHistory.push('/')
    })
  }

  render(){
    let addChatRoom = (payload) => {
      this.addChatRoom(payload)
    }

    let generalChatTitles = this.state.generalChats.map(chat=>{
        return chat.title
      })

    let x = ''
    let a = b => {
      b.forEach(user => {
        if (this.state.currentUser.username.indexOf(user.user.username) == -1){
          x = user.user.username
        }
      })
      return x
    }

    this.state.privateChats.forEach (chat => {
      if (chat.title == this.state.currentUser.username){
        chat.title = a(chat.chatroom_users)
      }
    })

    let privateChatTitles = this.state.privateChats.map(chat=>{
        return chat.title
      })

    // <div className="navbar">
    //   <BackButton />
    // </div>
    return(
      <div className="row wrapper">
        <div className="columns small-12 medium-4 large-3">
          <UserIndexContainer
            users={this.state.users}
            addChatRoom={addChatRoom}
            privateChatTitles={privateChatTitles}
          />
          <ChatTileContainer
            privateChats={this.state.privateChats}
            generalChats={this.state.generalChats}
            deleteChatRoom={this.deleteChatRoom}
            currentUser={this.state.currentUser}
            users={this.state.users}
          />
          <NewChatFormContainer
            addChatRoom={addChatRoom}
            privateChatTitles={privateChatTitles}
            generalChatTitles={generalChatTitles}
          />
        </div>

        <div className="columns medium-8 large-9">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default ChatContainer;
