// socket = io() is do the connection with the server
var socket = io();

let btn = document.getElementById("btn");
btn.onclick = () => {
  socket.emit("from_client");
};

socket.on("from_server", () => {
  const div = document.createElement("div");
  div.innerText = "New event from server";
  document.body.appendChild(div);
});
