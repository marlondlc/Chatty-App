import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessagesList from './MessageList.jsx';
import uuid from "uuid";
import { IncomingMessage } from 'http';



class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: 'Bobby'},                   // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }
  };




  componentDidMount() {

    const socketUrl = 'ws://localhost:3001';
    this.socket = new WebSocket(socketUrl);

    this.socket.onopen = event => {
       // console.log('client connected ');
      // this.socket.send(onChatbarSubmit)
    }


    //---

    // the below is what happens with MSG from server
    this.socket.onmessage = event => {
      const incomingMessage = JSON.parse(event.data);

      switch(incomingMessage.type) {
        case 'incomingClientInfo':
         console.log(incomingMessage);
         break;
          // later ex. will want to add other case: 'notification'
         default:
         console.log('unknown type of message')
      }
    };

    //---

    // Below is what happens with Errors (note needed for the project)
    this.socket.onerror = event => {
      console.log('Error Connecting to server');
    }
    //---
  }


  onChatbarSubmit = (content) => {                 // the newMsg is now a str of the msg

    const newMessage ={
      id: uuid(),                                     // this should  be uuid() each msg should have a unique #
      username: this.state.currentUser.name,
      content: content,
    }

    const oldMessages = this.state.messages
    this.setState({messages: [...oldMessages, newMessage] })
    this.socket.send(JSON.stringify(newMessage))    // this is communicating with the WS server



  };





  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      {/**  the below line is refering to MessageList.jsx using "import" above*/}
      <MessagesList messages={this.state.messages} submitEvent={this.onChatbarMessageSubmit}/>
      {/**  the below line is refering to ChatBar.jsx /and/ sned it props "currentUser"*/}
      <ChatBar currentUser={this.state.currentUser} onChatbarSubmit={this.onChatbarSubmit}/>

    </div>
    );
  }



}

export default App;
