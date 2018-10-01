import _pgp from 'pg-promise';
import dotenv from 'dotenv';

const result = dotenv.config()
if (result.error) {
  throw result.error;
}

const pgp = _pgp();
const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});


export default db;