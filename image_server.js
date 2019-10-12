var express = require('express');
//var pg = require('pg');
var app = express();
var server = app.listen(3000);
var fs = require('fs');

//#####For Running Python Script #####
const path = require('path')
const {spawn} = require('child_process')

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

/**
 * Run python script, pass in `-u` to not buffer console output 
 * @return {ChildProcess}
 */
app.use(express.static('public_html'));

function runScript(){
  return spawn('python', [
    "-u", 
    path.join(__dirname, 'RL_snake.py'),
    "--foo", "some value for foo",
  ]);
}



//####################################

console.log("My socket server is running");

var socket = require('socket.io')

var io = socket(server);

const subprocess = runScript()
io.sockets.on('connection', newConnection);
wait(5)


// print output of script
subprocess.stdout.on('data', (data) => {
  console.log(`data:${data}`);
  if (data === 'AUTO_Move') {
   socket.emit('AUTO_Move',data);
  }
});
subprocess.stderr.on('data', (data) => {
  console.log(`error:${data}`);
});
subprocess.on('close', () => {
  console.log("Closed");
});


function newConnection(socket) {
   console.log('new connection: ' + socket.id);

   socket.on('move', moveMsg);
   socket.on('dead', deathMsg);
   socket.on('AUTO_Move', autoMove);

   function moveMsg(data) {
      // console.log('Score: ' + data.score)
      // console.log('Sending Move: ' + data.x + ', ' + data.y)
      console.log("Move");
      console.log(data)
   }

   function deathMsg(data) {
      console.log("Death");
      console.log(data)
   }

   function autoMove(data) {
      console.log("Drawn");
      let transfer = {
         "file_name": data,
         "move": "",
         "turn": "py"
     }
     fs.writeFileSync('transfer.json', JSON.stringify(transfer));
   }
}