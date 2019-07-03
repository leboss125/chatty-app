import React, {Component} from 'react';

class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props.message)
  return(
    <div className="messages" key={this.props.id}>
    <span className="message-username" key={this.props.message.id}>{this.props.message.username}</span> 
    <span className="message-content" key={this.props.message.id + 'sec'}>{this.props.message.content}</span>
    </div>
    )
  }
}
  
export default MessageList;



