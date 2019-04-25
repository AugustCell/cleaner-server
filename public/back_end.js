var socket = io();

//Query DOM
var message = document.getElementById('message');
var button = document.getElementById('submit');

//Emit events
button.addEventListener('click', function(){
  console.log("Button clicked");
  socket.emit('chat', {
    message: message.value
  });
});

button = document.getElementById('request');
button.addEventListener('click', function(){
  console.log("Request button clicked");
  socket.emit('request', {
    message: "Show me your directory..."
  });
});

//Listen for events
socket.on('chat', function(data){
  alert("You typed: " + data.message);
});
