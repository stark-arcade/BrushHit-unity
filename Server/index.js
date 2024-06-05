'use strict';

const http = require('http');
const socket = require('socket.io');
const server = http.createServer();
const port = 11100;

var io = socket(server, {
    pingInterval: 10000,
    pingTimeout: 5000
});

io.use((socket, next) => {
    if (socket.handshake.query.token === "UNITY") {
        next();
    } else {
        next(new Error("Authentication error"));
    }
});

var deltaTime = 0;
var _position1, _position2;
io.on('connection', socket => {
  console.log('connection');

  deltaTime = new Date().getTime();
  setTimeout(() => {
    socket.emit('connection', {date: new Date().getTime(), data: "Hello Unity"})
  }, 1000);

  socket.on('hello', (data) => {
    console.log('hello', data);
    socket.emit('hello', {date: new Date().getTime(), data: data});
  });

  socket.on('spin', (data) => {
    console.log('spin');
    socket.emit('spin', {date: new Date().getTime(), data: data});
  });

  socket.on('class', (data) => {
    console.log('class', data);
    socket.emit('class', {date: new Date().getTime(), data: data});
  });

  socket.on('update', (data) => {
    socket.emit('update', {name: 'DeltaTime: ', data: (new Date().getTime() - deltaTime) *0.001 });
    deltaTime = new Date().getTime();
  });

  socket.on('update brush position', (position1, position2) => {
    _position1 = position1;
    _position2 = position2;
  });

  socket.on('add rubber', (data) => {
    addToRubberList();
  });

  socket.on('is collided', (index, position) => {
    socket.emit('update', {data: isBetweenTwoPoint(index, position)})
  });
});

var rubberNumber = 0;
var rubberDic = {};
function addToRubberList()
{
  rubberNumber++;
}

function isBetweenTwoPoint(index, position)
{
  var check = false;
  var checkX = (position.x - _position1.x) / (_position2.x - _position1.x);
  var checkY = (position.y - _position1.y) / (_position2.y - _position1.y);
  // Check if in the middle
  if (checkX == checkY && checkX > 0 && checkX < 1)
  {
    check = true;
  }

  if (check == true)
  {
    // in the middle of the line
    rubberDic.push({
      index: index,
      position: position
    });
  }
  return check;
}

function checkWin()
{
  return rubberDic.length == rubberNumber;
}

server.listen(port, () => {
  console.log('listening on *:' + port);
});