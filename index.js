var PORT = process.env.PORT || 4000;
var express = require('express');

//App setup
var app = express();
var server  = app.listen(PORT, function(){
  console.log("Connected to port!");
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = require('socket.io')(server);
io.set('heartbeat timeout', 5000);
io.set('heartbeat interval', 2000);

//Once connected. If it receives a chat value will emit a chat value
io.on('connection', function(socket){
  console.log("Made socket connection!", socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('received', data);
  });
  socket.on('requestDirs', function(data){
    io.sockets.emit('request');
  });
  socket.on('dirRequested', function(data){
    io.sockets.emit('dirReturned', data);
  })
});
