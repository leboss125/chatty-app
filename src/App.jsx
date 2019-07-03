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
  }

  componentDidMount() {
    this.setState({documentReady:true})
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      let Socket = new WebSocket("ws://localhost:3001");
      Socket.onopen = (event) => {
        console.log('conneced to the server')
        Socket.send("Here's some text that the server is urgently awaiting!"); 
      };
      // Add a new message to the list of messages in the data store   
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
    }, 3000);
  }


  userInput = (e) =>{
    if(this.state.documentReady){
      if(e.key === 'Enter'){
        const newMessage = {id: 6, username: this.state.currentUser.name, content: e.target.value};
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages})
        // this is for test 
        console.log(e.target.value);
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
