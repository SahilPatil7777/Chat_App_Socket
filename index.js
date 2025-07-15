const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// socket connection where we can listen to the event

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("msg_send", (data) => {
    console.log("Message received:", data);
    // io.emit("msg_rcvd", data);
    // socket.emit("msg_rcvd", data);
    socket.broadcast.emit("msg_rcvd", data);
  });
});

// middleware
app.use("/", express.static(__dirname + "/public"));

server.listen(3000, () => {
  console.log(`Server started on port 3000`);
});

// on is consumes the event
// emit is publish the event
