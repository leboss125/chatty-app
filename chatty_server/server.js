const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (data)=>{
    const {username, content, type, currentUserName, newUserName } = JSON.parse(data);
        if(type && type === "postMessage"){
            const userMessage =  {
                id:uuidv4(),
                type:'incomingMessage',
                username, 
                content
            };
            wss.clients.forEach(function each(client) {
                if (client.readyState) {
                  client.send(JSON.stringify(userMessage));
                }
              }); 
        }
        else if(type && type === 'postNotification'){
            // {"type": "incomingNotification", "content": "UserA has changed their name to UserB."}
            const newNotification =  {
                id:uuidv4(),
                type: 'incomingNotification',
                content: `User ${currentUserName} has changed their name to ${newUserName}`
            };
            if(newUserName === ""){
                newNotification['content'] = `User ${currentUserName} has changed their name to Anonymous`
              }
            console.log('notification', newNotification)
            wss.clients.forEach(function each(client) {
                if (client.readyState) {
                  client.send(JSON.stringify(newNotification));
                }
              }); 
        }
     
    
})






// wss.broadcast = function broadcast(data) {
//     console.log("broadcast called");
//   wss.clients.forEach(function each(client) {
//     console.log(data);
//     client.send(JSON.stringify(data));
//   });
// }



// ws.on('message', function incoming(data) {
//     console.log("broadcast called 1");
//     wss.clients.forEach(function each(client) {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(data);
//       }
//     });
//   });




  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});


