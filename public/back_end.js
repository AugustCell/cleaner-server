var socket = io();

//Query DOM
var message = document.getElementById('message');
var button = document.getElementById('submit');
var divSection = document.getElementById('Buttons');
var button2 = document.getElementById('request');

//Emit events
button.addEventListener('click', function(){
  console.log("Button clicked");
  socket.emit('chat', {
    message: message.value
  });
});

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

//If the buttons are clicked inside of the div, say its name.
document.addEventListener('click', function(e){
  if(divSection.contains(e.target)){
    alert(e.target.name);
  }
})

//Make buttons appear once files adn directory are here.
function spawnButtons(names){
  for(var i = 0; i < names.length; i++){
    const btn = document.createElement("BUTTON");
    btn.innerHTML += names[i];
    btn.name = names[i];
    divSection.appendChild(btn);
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
  divSection.innerHTML += "<br>" + "Files: " + "<br>";
  spawnButtons(files);
});
