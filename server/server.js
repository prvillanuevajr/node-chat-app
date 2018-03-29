const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
  socket.emit('greetings',{
    message: 'Welcome to chat room',
  });

  socket.broadcast.emit('NewUserJoined',{
    message: 'New user joined'
  });

  socket.on('disconnect',() => {
  console.log('User was disconnected');
    socket.broadcast.emit('NewUserJoined',{
      message: 'A user was disconnected'
    });
  });

  socket.on('createMessage',(newMessage) => {
    io.emit('newMessage',{
      from : newMessage.from,
      message : newMessage.message,
      createdAt: new Date().getTime(),
    });
  })


});
