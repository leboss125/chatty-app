import React, {Component} from 'react';
import Message from './Message'; 
import Notification from './Notification';

class MessageList extends Component {

  constructor(props){

    super(props);

  }
  render() {

  const messages = this.props.messages.map((message, index) =>{

    if(message.type === "incomingMessage"){

      return(

        <Message message={message} key={message.id}/>

      )
    }else if(message.type === "incomingNotification"){

      return (

        <Notification message={message} key={message.id} />

      )
    }
    
  } )
    return (

        <div>

            {messages}

        </div>
        
    );
  }
}
export default MessageList;
