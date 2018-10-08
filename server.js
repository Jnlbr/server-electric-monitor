import express from 'express';
import cors from 'cors';
import routes from './src/routes';
import { userSocket, deviceSocket } from './src/sockets';
// import * as WebSocket from 'ws';

// Const
const app = express();
const http = require('http');
const server = http.createServer(app);
// const io = require('socket.io').listen(server);
const Server = require('socket.io');
const io = new Server();
// const io2 = new Server();
// const io = require('socket.io')(server, {
//   path: '/test1'
// })
// io.path('/test1');
// io.origins((origin, callback) => {
//   callback(null, true);
// });
// io.origins
// io.path('/test1')
// io.origins('*:*');
io.listen(server);
// io2.lister(server)
// (server, {
//   path: '/test', 
//   serveClient: false,
//   // below are engine.IO options
//   pingInterval: 10000,
//   pingTimeout: 5000,
//   cookie: false,
// });
// io.listen(server)

// Express initial configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', routes);
// Sockets routes
io.of('/test1').use((socket,next) => {
  console.log('MIDDLEWARE');
  return next();
})
io.of('/test1').on('connection', userSocket);
io.of('/test2').on('connection', deviceSocket);

// (socket) => {
//   console.log('user connected 1');
//   socket.on('toServer', function (data) {
//     console.log('on')
//   });
//   socket.on('disconnect', function () {
//     // socket.broadcast.emit('arpLostConn', session.passport.user)
//   })
// }
// console.log('user connected 2');
// socket.on('toServer', function (data) {
//   console.log('on')
// });
// socket.on('disconnect', function () {
//   // socket.broadcast.emit('arpLostConn', session.passport.user)
// })
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('join', function (data) {
//     console.log(data);
//     socket.emit('messages', 'Hello from server');
//   });
// })

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});