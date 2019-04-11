// THIS IS THE SOCKET - server.js
const express = require("express");
const SocketServer = require("ws").Server;
const uuidv4 = require("uuid");

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  //END

  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "localhost", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });
//END

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  ws.on("message", function incoming(message) {
    let incomingMessage = JSON.parse(message);
    wss.clients.forEach(function each(client) {
      incomingMessage["id"] = uuidv4();

      client.send(JSON.stringify(incomingMessage)); //getting ID/user/content

      console.log(
        `User: ${incomingMessage.username} said: ${incomingMessage.content}`
      );
    });

    wss.clients.forEach(function each(client) {
      //client no being used!!!!!!!
      // the above code is broadcasting the MSG to all Users in the chat
      switch (incomingMessage.type) {
        case "postMessage":
          incomingMessage["type"] = "incomingMessage";
          break;

        case "postNotification":
          incomingMessage["type"] = "incomingNotification";
          break;

        default:
          // show an error in the console if the message type is unknown
          throw new Error(
            "Unknown event type " +
              client.send(JSON.stringify(incomingMessage.type))
          );
      }
    });

    console.log("Client connected");

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on("close", () => console.log("Client disconnected"));
  });
});
