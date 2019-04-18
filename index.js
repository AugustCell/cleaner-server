var PORT = process.env.PORT || 4000;
var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server  = app.listen(PORT, function(){
  console.log("Listening to request on port");
});

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket){
  console.log("Made socket connection!", socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
});
