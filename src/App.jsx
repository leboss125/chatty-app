import React, {Component} from 'react';
import messages from './messages';
import Message from './Message';
import ChatBar from './ChatBar';
import MessageList from './MessageList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      documentReady:false,
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.Socket = {}
  }
  
  componentDidMount() {
    // setto true when document component is ready
    this.setState({documentReady:true})

    setTimeout(() => {
      console.log("Simulating incoming message");
      this.Socket = new WebSocket("ws://localhost:3001");
      this.Socket.onopen = (event) => {
        console.log('conneced to the server')
      };
    }, 3000);

  }


  userInput = (e) =>{
    // check if the all component are mounted
    if(this.state.documentReady){
      if(e.key === 'Enter'){
        const newMessage = {username: this.state.currentUser.name, content: e.target.value};
        // const messages = this.state.messages.concat(newMessage)
        // this.setState({messages: messages})
        // this is for test 
        console.log(e.target.value);        
        this.Socket.send(JSON.stringify(newMessage));
      }
    }
  }

  newUser = (e) =>{
    if(this.state.documentReady){
        this.setState({currentUser: {name:e.target.value}})
        console.log(e.target.value);
        if(e.target.value === ""){
          this.setState({currentUser: {name:'Anonymous'}})
        }
    }
  
  }
  

  render() {
    return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
    </nav>
    
    <div className="message system">
      <Message messages={this.state.messages} user={this.state.currentUser.name} />
    </div>
  <ChatBar user={this.state.currentUser.name} setUser={this.newUser} newMessage={this.userInput}  />
  </div>
    );
  }
}
export default App;
