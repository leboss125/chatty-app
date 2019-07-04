import React, {Component} from 'react';
import messages from './messages';
import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      documentReady:false,
      currentUser: {name: "jimmy"},
      messages: [],
    }
    this.Socket = {}
  }
  
  componentDidMount() {
    // setto true when document component is ready
    this.setState({documentReady:true})
    
    console.log("Simulating incoming message");
    // connect to the ws server

    this.Socket = new WebSocket("ws://localhost:3001");

    this.Socket.onopen = (event) => {

    console.log('connected to the server')
    // getting the messages from the server
    this.Socket.onmessage =  (event) => {

    const newMessage = JSON.parse(event.data);

    const messages = [...this.state.messages, newMessage]

    console.log('hello 3',messages)
    this.setState({messages})
        }
      };
    

  }


  userInput = (e) =>{
    // check if the all component are mounted
    if(this.state.documentReady){
      if(e.key === 'Enter'){
        const newMessage = {type:'postMessage',username: this.state.currentUser.name, content: e.target.value};
        // const messages = this.state.messages.concat(newMessage)
        // this.setState({messages: messages})
        //  test 
        console.log(newMessage)
        this.Socket.send(JSON.stringify(newMessage));
      }
    }
  }

  newUser =  (e) =>{
    if(this.state.documentReady){
      // make the obj wish going to be sent  to ws server
      const newNotification = {type:'postNotification',currentUserName: this.state.currentUser.name}
      // update user name state
      this.setState({currentUser: {name:e.target.value}})
      newNotification['newUserName'] = e.target.value;
      console.log('username obj', newNotification)
      if(e.target.value === ""){
        e.target.value = "Anonymous"
        this.setState({currentUser: {name: 'Anonymous'}})
      }
      this.Socket.send(JSON.stringify(newNotification))
   
    }
  
  }
  

  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    
    <div className="message system">
      <MessageList messages={this.state.messages} user={this.state.currentUser.name} />
    </div>
  <ChatBar user={this.state.currentUser.name} setUser={this.newUser} newMessage={this.userInput}  />
  </div>
    );
  }
}
export default App;
