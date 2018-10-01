import jwt from 'jsonwebtoken';
import secret from '../config/secret';

export default (data) => {
  return jwt.sign({ 
    data: { ...data }}, 
    secret, 
    { expiresIn: 86400 }
  );
}