const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// socket connection where we can listen to the event
io.on("connection", (socket) => {
  console.log("a use connected", socket.id);

  socket.on("from_client", () => {
    console.log("Event coming from client");
  });

  setInterval(() => {
    socket.emit("from_server");
  }, 1000);
});

// middleware
app.use("/", express.static(__dirname + "/public"));

server.listen(3000, () => {
  console.log(`Server Stated on port 3000`);
});

// on is consumes the event
// emit is publish the event
