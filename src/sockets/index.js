const socket = require('socket.io');

var io;

module.exports.init = (server) => {
  io = socket(server);
  io.on(
    'connection',
    (socket) => {
      console.log('Device connected to general room');      
    }
  );

  io.on(
    'disconnect',
    (socket) => {
      console.log('Device disconnected from general room')
    }
  )

  io.of('/user').on(
    'connect',
    (socket) => {
      console.log('User connected to user\' room');
    }
  )

  io.of('/user').on(
    'disconnect',
    (socket) => {
      console.log('User disconnected from user\'s room');
    }
  )

  return io;
}

module.exports.io = function () {
  return io;
};
