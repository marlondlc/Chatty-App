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

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    //if (client.readyState === SocketServer.OPEN) {
    client.send(data);
    //}
  });
};

const onlineUsers = {
  // this is create an obj and sending the data to the client side  under nbUsers
  nbUsers: 0,
  type: "nbUsers"
};

// if im sending an obj you need to "JSON.Stringify"
// if you are sending a specific piece of data "onlineUSers.nbUser" (which is just an intiger) no need to stingify because its not an obj.

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on("connection", ws => {
  onlineUsers.nbUsers = wss.clients.size;
  wss.broadcast(JSON.stringify(onlineUsers));

  ws.on("message", function incoming(message) {
    let clientMessage = JSON.parse(message);
    clientMessage["id"] = uuidv4();
    // console.log(
    //   `User: ${clientMessage.username} said: ${clientMessage.content}`
    // );

    switch (clientMessage.type) {
      case "postMessage":
        clientMessage["type"] = "incomingMessage";
        wss.broadcast(JSON.stringify(clientMessage));

        break;

      case "postNotification":
        clientMessage["type"] = "incomingNotification";
        wss.broadcast(JSON.stringify(clientMessage));
        break;

      default:
        // show an error in the console if the message type is unknown
        // client.send(JSON.stringify(incomingMessage));
        throw new Error(
          "Unknown event type " + JSON.stringify(incomingMessage)
        );
    }

    console.log("Client connected");

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    wss.broadcast(
      JSON.stringify({
        // this is create an obj and sending the data to the client side  under nbUsers
        nbUsers: wss.clients.size,
        type: "nbUsers"
      })
    );
  });

  ws.on("close", () => {
    console.log("client disconnected");
    onlineUsers.nbUsers = wss.clients.size;
    wss.broadcast(JSON.stringify(onlineUsers));
  });
});
