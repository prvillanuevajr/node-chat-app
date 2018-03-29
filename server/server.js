const path = require('path');
const express = require('express');
const http = require('http');
const app = express();
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage} = require('./utils/message');
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

});

server.listen(port,() => {
console.log('Connected on port');
});