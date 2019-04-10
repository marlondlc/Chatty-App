import React, {Component} from 'react';

/*state.messages = [
  {
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1"
  },
  {
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
  },
  {
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "...",
    username: "nomnom"
  },
  {
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2"
  },
  {
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom"
  },
  {
    type: "incomingNotification",
    content: "Anonymous2 changed their name to NotFunny",
  },
]
*/

class Message extends Component {


  render(){

    return(

        <div className="message">
          <span className="message-username">{this.props.username} </span>
          <span className="message-content">{this.props.content} </span>
        </div>

    );
  }
}


/**
above should be written as a f(): EXAMPLE // because stateless

function chartBar(props){
  return (
    <footer>
      <input class="chatbar-username" placeholder="Your Name (Optional)" />
      <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
    </footer>
  );
}

*/

export default Message;