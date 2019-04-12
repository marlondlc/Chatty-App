import React, {Component} from 'react';


class Notification extends Component {


  render(){

    return(

      <div className="notification">
        <span className="notification-content">{this.props.content}</span>
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

export default Notification;