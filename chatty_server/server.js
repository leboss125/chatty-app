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

let connectCounter = 0;

wss.on('connection', (ws) => {

    connectCounter++;

    wss.clients.forEach(function each(client) {

        if (client.readyState) {

          client.send(JSON.stringify({userCounter: connectCounter}));

        }
      }); 

  console.log('Client connected');

  ws.on('message', (data)=>{

    const {username, content, type, currentUserName, newUserName } = JSON.parse(data);
        // check if the type exist and its = postMessage
        if(type && type === "postMessage"){

            const userMessage =  {

                id:uuidv4(),

                type:'incomingMessage',

                username,

                content,

                userCounter:connectCounter
                
            };
            // for each user connected send the user message
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

                content: `User ${currentUserName} has changed their name to ${newUserName}`,

                userCounter:connectCounter

            };

            if(newUserName === ""){

                newNotification['content'] = `User ${currentUserName} has changed their name to Anonymous`;

              }
            // for each user send notifiction
            wss.clients.forEach(function each(client) {

                if (client.readyState) {

                  client.send(JSON.stringify(newNotification));

                }

              }); 
        }
})


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {

    connectCounter--;

    // send user to connectCounter to each connected user
    wss.clients.forEach(function each(client) {

    if (client.readyState) {

        client.send(JSON.stringify({userCounter: connectCounter}));

    }
    });

      console.log('Client disconnected',connectCounter);

    });

});


