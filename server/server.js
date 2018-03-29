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
  console.log('New user connected');

  socket.on('disconnect',() => {
  console.log('User was disconnected');
  });

  socket.emit('newMessage', {
    to: 'sha@example.com',
    from: 'pres@email.com',
    message: 'pangolier@example.com',
  });

  socket.on('createMessage',(newMessage) => {
    console.log(newMessage);
  })


});
