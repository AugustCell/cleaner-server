var socket = io();

//Query DOM
var message = document.getElementById('message');
var button = document.getElementById('submit');
var divSection = document.getElementById('Buttons');

//Emit events
button.addEventListener('click', function(){
  console.log("Button clicked");
  socket.emit('chat', {
    message: message.value
  });
});

button2 = document.getElementById('request');
button2.addEventListener('click', function(){
  alert("Request button clicked");
  socket.emit('requestDirs', {
    message: "Show me your directory..."
  });
});

//Listen for events
socket.on('chat', function(data){
  alert("You typed: " + data.message);
});

socket.on('dirReturned', function(data){
  console.log(data.dirs);
  var directories = data.dirs;
  for(var i = 0; i < directories.length; i++){
    var btn = document.createElement("BUTTON");
    btn.innerHTML = directories[i];
    divSection.appendChild(btn);
    btn.addEventListener('click', function(){
      alert("This is my name " + btn.id);
    })
  }
  //var obj = JSON.parse(data);
  //console.log(typeof(obj));
  //console.log(obj);
  //for(var i = 0; i < dirList.length; i++){
    //console.log("This is element " + i + " " + dirList[i]);
  //}
});

/*
socket.on('directories', function(data){

  for(var i = 0; i < data.length; i++){

  }
})
*/
