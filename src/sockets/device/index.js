import currentHandler from './currentHandler';

export default (socket) => {
  console.log('Device connected to Web Socket!');

  socket.on('current', currentHandler);
}