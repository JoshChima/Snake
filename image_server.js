var express = require('express');
//var pg = require('pg');
var app = express();
var server = app.listen(3000);

app.use(express.static('public_html'));

console.log("My socket server is running");

var socket = require('socket.io')

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
   console.log('new connection: ' + socket.id);

   socket.on('move', moveMsg);

   function moveMsg(data) {
      console.log('Score: ' + data.score)
      console.log('Sending Move: ' + data.x + ', ' + data.y)
   }
}