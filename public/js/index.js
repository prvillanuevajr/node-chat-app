var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server.');
});

socket.on('disconnect', function ()  {
  console.log('Disconnected');
});

socket.on('newMessage',function (newMessage) {
  var li = $('<li></li>');
  li.text(`${newMessage.from}: ${newMessage.text}`);
  $('#messages').append(li);
});

socket.on('greetings',function (message) {
  console.log(message);
});

socket.on('newUserJoined',function (message) {
  console.log(message);
});
socket.on('userDisconnected',function (message) {
  console.log(message);
});

$('#form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage',{
    text: $('#messageInput').val(),
    from: "user",
  }, function(mes){
  });
})