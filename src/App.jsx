import React, { Component } from 'react';
import messages from './messages';
import ChatBar from './ChatBar';
import MessageList from './MessageList';
import Header from './Header';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {

      documentReady: false,

      currentUser: { name: "jimmy" },

      messages: [],

      userCounter: 0

    }
    this.Socket = {};
  }

  componentDidMount() {
    // set true when document component is ready
    this.setState({ documentReady: true });

    console.log("Simulating incoming message");
    // connect to the ws server

    this.Socket = new WebSocket("ws://localhost:3001");

    this.Socket.onopen = (event) => {

      // getting the connected user counter 

      console.log('connected to the server');
      // getting the messages from the server
      this.Socket.onmessage = (event) => {
        const {userCounter} = JSON.parse(event.data);

        this.setState({userCounter:userCounter});
        
        const newMessage = JSON.parse(event.data);

        const messages = [...this.state.messages, newMessage];
        this.setState({ messages });
      }
    };


  }


  userInput = (e) => {

    // check if the all component are mounted

    if (this.state.documentReady) {

      if (e.key === 'Enter') {
        //  make the new message to sent to ws server
        const newMessage = { type: 'postMessage', username: this.state.currentUser.name, content: e.target.value };

        this.Socket.send(JSON.stringify(newMessage));

        e.target.value ="";
      }
    }
  }

  newUser = (e) => {

    if (this.state.documentReady) {
      // make the obj wish going to be sent  to ws server
      const newNotification = { type: 'postNotification', currentUserName: this.state.currentUser.name };
      // update user name state
      this.setState({ currentUser: { name: e.target.value } });

      newNotification['newUserName'] = e.target.value;

      if(newNotification['currentUserName'] !== newNotification['newUserName']){

      if (e.target.value === "") {

        e.target.value = "Anonymous";

        this.setState({ currentUser: { name: 'Anonymous' } });

      }

      this.Socket.send(JSON.stringify(newNotification));

      }
    }
  }


  render() {
    
    return (

      <div>

        <Header connectedUser={this.state.userCounter} />

        <div className="message system">

          <MessageList messages={this.state.messages} user={this.state.currentUser.name} />

        </div>

        <ChatBar user={this.state.currentUser.name} setUser={this.newUser} newMessage={this.userInput} />
        
      </div>
    );
  }
}

export default App;
