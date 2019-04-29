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

function spawnButtons(names){
  for(var i = 0; i < names.length; i++){
    const btn = document.createElement("BUTTON");
    btn.innerHTML += names[i];
    btn.name = names[i];
    divSection.appendChild(btn);
    btn.addEventListener('click', function(){
      alert("This is my name " + btn.name);
    });
  }
}

//This function is used to get directories and
//files returned from the python side.
socket.on('dirReturned', function(data){
  divSection.innerHTML = "";
  var directories = data.dirs;
  var files = data.files;
  divSection.innerHTML = "Directories: " + "<br>";
  spawnButtons(directories);
  divSection.innerHTML += "Files: " + "<br>";
  spawnButtons(files);
  /*
  for(var i = 0; i < directories.length; i++){
    const btn = document.createElement("BUTTON");
    btn.innerHTML = "Directory: " + directories[i];
    btn.name = directories[i];
    divSection.appendChild(btn);
    btn.addEventListener('click', function(){
      alert("This is my name " + btn.name);
    });
  }
  for(var i = 0; i < directories.length; i++){
    const btn = document.createElement("BUTTON");
    btn.innerHTML = "Directory: " + directories[i];
    btn.name = directories[i];
    divSection.appendChild(btn);
    btn.addEventListener('click', function(){
      alert("This is my name " + btn.name);
    });
  }
*/

});
