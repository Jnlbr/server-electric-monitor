import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './src/routes';

// Environment variables support
// require('dotenv').config()
const result = dotenv.config()
if(result.error) {
  throw result.error;
}

// Const
const app = express();

// Express initial configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log('Example app listening on port ' + process.env.PORT);
});