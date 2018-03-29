var socket = io();

socket.on('welcomegreet',function (message) {
  var li = $('<div class="card bg-danger messagediv text-light"></div>');
  li.text(`${message.from}: ${message.text}`);
  $('.messages').append(li);
});

socket.on('thenewmessage',function (message) {
  var li = $('<div class="card bg-danger messagediv text-light"></div>');
  li.text(`${message.from}: ${message.text}`);
  $('.messages').append(li);
});

socket.on('thenewmessageLocation',function (url) {
  var li = $('<div class="card bg-danger messagediv text-light"></div>');
  li.html(`Address: ${url.text}`);
  $('.messages').append(li);
},function () {
  
})

$('#send').click(function(){
  if ($('#messageInput') != '') {
    socket.emit('newMessage',{
      from: 'x',
      text: $('#messageInput').val()
    });
    $('#messageInput').val('')
  }
});

$('#sendLocation').on('click',function(){
  if(!navigator.geolocation){
   return alert('No supported by your browser');
  }
  $(this).attr('disabled','disabled').text('Please wait..');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage',{
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  $('#sendLocation').removeAttr('disabled').text('Send location');
  }, function () {
    alert('Unable to fetch location');
  });
});