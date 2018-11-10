import React from 'react';
import ChatTile from '../components/ChatTile'

class ChatTileContainer extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    let generalChats = this.props.generalChats
    let privateChats = this.props.privateChats
    let currentUser = this.props.currentUser
    // let privateChats = []
    // let rejectedChats = []

    // let x = ''
    // let a = b => {
    //   b.forEach(user => {
    //     if (currentUser.username.indexOf(user.user.username) == -1){
    //       x = user.user.username
    //     }
    //   })
    //   return x
    // }
    //
    // privateChats.forEach (chat => {
    //   if (chat.title == currentUser.username){
    //     chat.title = a(chat.chatroom_users)
    //   }
    // })
    //
    // chats.forEach (chat => {
    //   chat.chatroom_users.forEach (u => {
    //     users.forEach (user => {
    //       if (chat.title == user.username && u.user.username == currentUser.username){
    //         privateChats.push(chat)
    //       } else if (chat.title == user.username && u.user.username != currentUser.username){
    //         rejectedChats.push(chat)
    //       }
    //     })
    //   })
    // })
    //
    // let c = privateChats.concat(rejectedChats)
    // let generalChats = []
    // chats.forEach (chat => {
    //   if (c.indexOf(chat) == -1){
    //     generalChats.push(chat)
    //   }
    // })

    let mappedGeneralChats, mappedPrivateChats;
    let mapChats = (xx, yy) => {
      yy = xx.map(x => {
        let handleDelete = () => {
          this.props.deleteChatRoom(x.id)
        }
        return(
          <ChatTile
            key={x.id}
            id={x.id}
            title={x.title}
            description={x.description}
            messages={this.props.messages}
            handleDelete={handleDelete}
            current_user={currentUser}
          />
        )
      })
      return yy
    }

    return(
      <div className='chat-title text-center'>
        <div className='callout general-chat' id='chatWindow'>
          <h6 className="general-chat-title"><strong>GENERAL CHATS</strong></h6>
          {mapChats(generalChats, mappedGeneralChats)}
        </div>
        <div className='callout private-chat' id='chatWindow'>
          <h6 className="private-chat-title"><strong>PRIVATE CHATS</strong></h6>
          {mapChats(privateChats, mappedPrivateChats)}
        </div>
      </div>
    )
  }
}

export default ChatTileContainer
