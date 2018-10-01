import express from 'express';
import cors from 'cors';
import routes from './src/routes';
// import passport from 'passport';
// import session from 'express-session';

// Environment variables support
// require('dotenv').config()


// Const
const app = express();

// Express initial configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(session({
//   secret: 'catlovedogs',
//   resave: false,
//   saveUninitialized: false,
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT);
});