// socket = io() is do the connection with the server
var socket = io();

let btn = document.getElementById("btn");
let inputMsg = document.getElementById("newmsg");
let msgList = document.getElementById("msglist");

btn.onclick = function () {
  socket.emit("msg_send", {
    msg: inputMsg.value,
  });
};

socket.on("msg_rcvd", (data) => {
  let limsg = document.createElement("li");
  limsg.innerText = data.msg;
  msgList.appendChild(limsg);
});
