import React from 'react';
import UserTile from '../components/UserTile'

const plusButton = <i className='fa fa-plus-square plusButton' aria-hidden='true'></i>
const minusButton = <i className='fa fa-minus-square minusButton' aria-hidden='true'></i>

class UserIndexContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      buttonType: plusButton,
      usersss: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    if (this.state.buttonType == minusButton){
      this.setState({buttonType: plusButton})
    } else {
      this.setState({buttonType: minusButton})
    }
  }

  handleChange(event){
    if (this.props.privateChatTitles.includes(event.target.innerText)){
      alert(`this chatroom ${event.target.innerText} already exist`)
      return false
    } else {
      this.props.addChatRoom({title: event.target.innerText});
    }
  }

  render(){
    let users = this.props.users.map(user => {
      return(
        <UserTile
          key={user.id}
          username={user.username}
          handlerFunction={this.handleChange}
        />
      )
    });

    let handleVisibility = () => {
      this.handleButton()
      if (this.state.buttonType == minusButton){
        this.state.usersss = ''
      } else {
        this.state.usersss = users
      }
    }

    return(
      <div className="text-center callout user-wrapper" id="chatWindow">
        <div onClick={handleVisibility} >
          <strong>USERS LIST &nbsp;&nbsp;</strong>
          {this.state.buttonType}
        </div>
        <ul className="menu vertical user-list">
          {this.state.usersss}
        </ul>
      </div>

    )
  }
}

export default UserIndexContainer
