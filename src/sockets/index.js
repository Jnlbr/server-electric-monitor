const socket = require('socket.io');

var io;

module.exports.init = (server) => {
  io = socket(server);
  io.on(
    'connection',
    (socket) => {
      console.log('A user connected');      
    }
  );

  return io;
}

module.exports.io = function () {
  return io;
};
