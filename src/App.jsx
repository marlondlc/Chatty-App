import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessagesList from './MessageList.jsx';
import uuid from "uuid";

const handleOnOpen = event => {
  console.log('client connected ');
}

const handleOnError = event => {
  console.log('Error Connecting to server');
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: uuid(),
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: uuid(),
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);

    const socketUrl = 'ws://localhost:3001';

    const socket = new WebSocket(socketUrl);

    socket.onopen = handleOnOpen;                      // set it to a function then outside the class create the f() you could have also set the function after the "=" .
    socket.onerror = handleOnError;
  }



  onChatbarSubmit = (newMessage) => {                 // the newMsg is now a str of the msg

    const StructureMessage =
    {
      id: uuid(),                                     // this should  be uuid() each msg should have a unique #
      username: this.state.currentUser.name,
      content: newMessage,
    }

    const oldMessages = this.state.messages
    this.setState({messages: [...oldMessages, StructureMessage] })

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
