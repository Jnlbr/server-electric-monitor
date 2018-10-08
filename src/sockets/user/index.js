export default (socket) => {

  console.log('user connected');

  // socket.on('message', (d) => {
  //   console.log('user message');
  //   console.log(d);
  // })
  socket.emit('message', { 
    character: 'Albany',
    lore: 'she is mysterious',
    age: '?',
    personality: '?',
    particularities: '?',
    appearance: '?',
    mannerisms: '?',
    traits: '?',
    emotions: '?',
  })
}