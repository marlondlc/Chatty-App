import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {

  render() {

    let messageList = this.props.messages.map(message => {

      if(message.type == 'incomingMessage') {
        return <Message  content={message.content}
                         username={message.username}
                         key={message.id}
                />
      } else {
        return <Notification  content={message.content}
                              key={message.id}/>
      }
    })

    return (
      <div>
        <p>{this.props.username}</p>
        <main className="messages">{messageList}</main>
      </div>

    )
  }
}

export default MessageList;

