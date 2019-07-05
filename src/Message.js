import React, {Component} from 'react';

class MessageList extends Component {
  
  constructor(props){

    super(props);

  }
  render() {

  return(

    <div className="messages">

    <span className="message-username" >{this.props.message.username}</span> 

    <span className="message-content" >{this.props.message.content}</span>

    </div>

    )
  }
}
  
export default MessageList;



