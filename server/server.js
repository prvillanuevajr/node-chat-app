const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.get('/',(req,res) => {
  res.render('index.html')
});

server.listen(port,() => {
  console.log('Connected to server' + port);
});

io.on('connection',(socket) => {
  socket.emit('greetings',generateMessage('Admin','Welcome to the chat room'));

  socket.broadcast.emit('newUserJoined',generateMessage('Admin','New user joined the chat room'));

  socket.on('disconnect',() => {
  console.log('User was disconnected');
    socket.broadcast.emit('userDisconnected',generateMessage('Admin','A user was disconnected'));
  });

  socket.on('createMessage',(newMessage) => {
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
  });


});
