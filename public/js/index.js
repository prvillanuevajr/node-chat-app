var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server.');
});

socket.on('disconnect', function ()  {
  console.log('Disconnected');
});

socket.on('newMessage',function (newMessage) {
  console.log(newMessage);
});

socket.on('greetings',function (message) {
  console.log(message);
});

socket.on('NewUserJoined',function (message) {
  console.log(message);
});