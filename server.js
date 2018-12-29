import express from 'express';
import cors from 'cors';
import routes from './src/routes';
const socket = require('socket.io');

const app = express();

// Express initial configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(function (req,res,next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// const http = require('http');
// const server = http.createServer(app);
// const io = require('socket.io').listen(server);
// const Server = require('socket.io');
// const io = new Server();
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
// io.listen(server);
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


// Sockets routes
// io.of('/test1').use((socket,next) => {
//   console.log('MIDDLEWARE');
//   return next();
// })
// io.of('/test1').on('connection', userSocket);
// io.of('/test2').on('connection', deviceSocket);

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

const server = app.listen(
  process.env.PORT, 
  () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});

const io = require('./src/sockets').init(server);

app.use((req, res, next) => { 
  req.socket = io; 
  next();
});
app.use('/', routes);