const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage,generateMessageLocation} = require('./utils/message');
app.use(express.static(path.join(__dirname + '/../public')))
const port = process.env.PORT || 3000;

app.get('/',(req,res) => {
  res.render('index.html');
});

io.on('connect',(socket) => {
  socket.emit('welcomegreet',generateMessage('Chat roomxx','Welcome to chat room'));

  socket.on('newMessage',(message) => {
    io.emit('thenewmessage',generateMessage(message.from,message.text));
  });

  socket.on('createLocationMessage',(coords) => {
    console.log(coords);
    generateMessageLocation('Admin',coords.lat,coords.lng).then((res) => {
      console.log(res);
      io.emit('thenewmessageLocation',generateMessage(res.from,res.url));
    })
    // io.emit('thenewmessageLocation',generateMessageLocation('Admin',coords.lat,coords.lng));
  })

});

//https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyDJeS1fL1Ku1SfqzFXFHB6BziEgd_gh3nI


server.listen(port,() => {
console.log('Connected on port');
});