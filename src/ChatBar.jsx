import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      message: '',
    }
  }

  userNameHandler = (event) => {
    this.setState({username: event.target.value})
  }

  messageHandler = (event) => {
    const message = event.target.value;
    this.setState({message: message})
  }

  onSubmitHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.onChatbarSubmit(this.state.message)       // calling submit e and is passing the msg string
      this.setState({username: '', message: ''})           // this will clear the textbox input once entered
    }
  }



  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} placeholder={this.props.currentUser.name}  onChange={this.userNameHandler}/>
        <input className="chatbar-message" value={this.state.message} placeholder="Type a message and hit ENTER" onChange={this.messageHandler} onKeyPress={this.onSubmitHandler}/>
      </footer>
    )
  }

}

export default ChatBar;

