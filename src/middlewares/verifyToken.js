import jwt from 'jsonwebtoken';
import secret from '../config/secret'

export default (req, res, next) => {
  const token = req.headers['x-access-token'];
  const send = (status,body) => res.status(status).send({ status, body });
  if (!token)
    send(401, {message: 'No token provided'});
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log('VERIFY TOKEN ERR');
      console.log(err);
      send(500, err.message || 'Try again');
    } else {
      req.ids = { ...decoded.data };
      next()
    }
  });
}