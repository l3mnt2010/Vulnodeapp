const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`You sent: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});
//

// wss.on("connection", (ws) => {
//   console.log("Client connected to WebSocket");

//   ws.on("message", (message) => {
//     // Broadcast received message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected from WebSocket");
//   });
// });
//
