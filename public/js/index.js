var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to server.');
});

socket.on('disconnect', function ()  {
  console.log('Disconnected');
});

socket.on('newMessage',function (email) {
  console.log(email);
});

socket.emit('createMessage', {
  from: 'sha@example.com',
  to: 'pres@email.com',
  message: 'pangolier@example.com',
});