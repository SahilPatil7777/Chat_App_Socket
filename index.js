const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const connect = require("./config/database-config");

const Chat = require("./models/chat");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// socket connection where we can listen to the event

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    console.log("Joining room", data.roomId);
    socket.join(data.roomId);
  });

  socket.on("msg_send", async (data) => {
    console.log("Message received:", data);
    const chat = await Chat.create({
      roomId: data.roomId,
      user: data.username,
      content: data.msg,
    });
    io.to(data.roomId).emit("msg_rcvd", data); // send to room
  });
});

app.set("view engine", "ejs");
// middleware
app.use("/", express.static(__dirname + "/public"));

app.get("/chat/:roomid", async (req, res) => {
  const chats = await Chat.find({ roomId: req.params.roomid }).select(
    "content user"
  );
  console.log(chats);
  res.render("index", { name: "Sahil", id: req.params.roomid, chats: chats });
});

server.listen(3000, async () => {
  console.log(`Server started on port 3000`);
  await connect();
  console.log("MongoDB connected");
});

// on is consumes the event
// emit is publish the event
