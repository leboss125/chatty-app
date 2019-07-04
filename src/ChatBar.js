import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
  <footer className="chatbar">
    <input className="chatbar-username" onBlur={this.props.setUser}   defaultValue={this.props.user} placeholder="Your Name (Optional)" />
    <input className="chatbar-message" onKeyPress={this.props.newMessage} name="message" placeholder="Type a message and hit ENTER" />
  </footer>
    );
  }
}
export default ChatBar;