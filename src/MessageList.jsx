import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  render() {
    return (
      <main className="messages">
           {this.props.messages.map(message =>
              <Message  content={message.content}
                        username={message.username}
                        key={message.id}/> /** every msg must have a key */
           )}
      </main>

    )
  }
}

export default MessageList;

