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
    const newName = event.target.value;
    this.setState({username: newName})         // resets the username to the what was entered
    console.log('this is the name field:',newName)
  }

  onUserNameSubmit = (event) => {

    if(event.key === "Enter") {
    this.props.updateCurrentUser(this.state.username)           // triggereing a f()  thats defined in the app
    this.setState({username: ''})
    }


  }


  messageHandler = (event) => {
    const message = event.target.value;
    this.setState({message: message})

  }

  onSubmitHandler = (event) => {
    if (event.key === 'Enter') {
      this.props.onChatbarSubmit(this.state.message)       // calling submit event and is passing the msg string
      this.setState({username: '', message: ''})           // this will clear the textbox input once entered
    }
  }



  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={this.state.username} placeholder={this.props.currentUser.name}  onChange={this.userNameHandler} onKeyPress={this.onUserNameSubmit}/>
        <input className="chatbar-message" value={this.state.message} placeholder="Type a message and hit ENTER" onChange={this.messageHandler} onKeyPress={this.onSubmitHandler}/>
      </footer>
    )
  }

}

export default ChatBar;

