import React, {Component} from 'react';
import Message from './Message'; 

class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
  const messages = this.props.messages.map((message, index) => <Message id={index} message={message} /> )
    return (
        <div className="messages">
            {messages}
        </div>
    );
  }
}
export default MessageList;
