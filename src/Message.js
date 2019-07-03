import React, {Component} from 'react';
import MessageList from './MessageList';


class Message extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
    <main className="messages">
        <MessageList messages={this.props.messages} />
    </main>
    );
  }
}
export default Message;



