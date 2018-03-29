var socket = io();

socket.on('welcomegreet',function (message) {
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('.messages').append(li);
});

socket.on('thenewmessage',function (message) {
  var li = $('<li class="text-dark"></li>');
  li.text(`${message.from}: ${message.text}`);
  $('.messages').append(li);
});

$('#send').click(function(){
  if ($('#messageInput') != '') {
    socket.emit('newMessage',{
      from: 'x',
      text: $('#messageInput').val()
    });
  }
})