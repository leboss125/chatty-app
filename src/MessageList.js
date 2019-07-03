import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
  const messages = this.props.messages.map((message, index) =>  {
  return (
  <div className="message" key={index + 2 }> 
    <span key={index + 1} className="message-username">{message.username}</span> 
     <span key={index} className="message-content">{message.content}</span>  
   </div>
  )
   })
    return (
        <div>
            {messages}
        </div>
    );
  }
}
export default MessageList;
