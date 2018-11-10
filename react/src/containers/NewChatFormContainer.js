import React from 'react';
import NewChatTile from '../components/NewChatTile';

class NewChatContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateEntry = this.validateEntry.bind(this);
  }

  handleChange(event){
    this.validateEntry(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateEntry(entry){
    debugger
    if ( entry.trim() === "" ||
         this.props.generalChatTitles.includes(entry) ||
         this.props.privateChatTitles.includes(entry) ){
      let newError = {title: "You must enter a unique-title to create a ChatRoom"}
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false;
    } else {
      let errorState = this.state.errors
      delete errorState.title
      this.setState({errors: errorState})
      return true
    }
  }

  handleSubmit(event){
    event.preventDefault()
    if (this.validateEntry(this.state.title)){
      this.props.addChatRoom({title: this.state.title});
      this.handleClear();
    }
  }

  handleClear(){
    this.setState({
      title: '',
      errors: {}
    })
  }

  render(){
    let errorDiv;
    let errorItems;

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div>{errorItems}</div>
    }

    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          {errorDiv}
          <NewChatTile
            name="title"
            label="Title"
            content={this.state.title}
            handlerFunction={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default NewChatContainer
