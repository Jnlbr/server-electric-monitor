import status from 'http-status';
import validator from 'validator';
import crypt from '../util/crypt';
import signToken from '../util/signToken';
import db from '../config/db';
import { UserDAO } from '../daos';
import { authService, registerService } from '../services'

const userData = async (req,res) => {
  const { userId } = req.ids;
  const send = (status, body) => res.status(status).send({ status, body });

  authService.userData(userId)
  .then(data => {
    send(200, data);
  })
  .catch(err => {
    send(400, err.message || err);
  });
}

const signup = async (req, res) => {
  const { username, email, password, code } = req.body;
  const send = (status,body) => ({ status, body });

  if(validator.isEmail(email)) {
    db.task(async t => {
      console.log('AUTH_SIGN_UP: VALID DATA');
      const user = new UserDAO(t);      

      let _email = await user.exist('email', email);
      if(_email) {
        console.log(_email)
        console.log('AUTH_SIGN_UP: EMAIL ALREADY REGISTERED');
        return send(409, { message: 'Email already registered' });
      }
        
      else {
        let _username = await user.exist('username', username);
        if(_username) {
          console.log('AUTH_SIGN_UP: USERNAME ALREADY REGISTERED');
          return send(409, { message: 'Username already registered' });
        }          
        else {
          console.log('AUTH_SIGN_UP: NEW USER');
          const hash = crypt.hash(password);
          let _user = await user.create({...req.body, password: hash});
          return registerService.userRegister(_user.id, code)
          .then(({status, body}) => {
            console.log(status);
            console.log(body);
            return send(status, {
              ...body,
              email,
              username,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
            })
          })
          .catch(err => {
            // ADD LOGGER
            console.log('USER REGISTER ERR: ' + err.message);
            console.log(err);
            return send(500, err.message || err);
          })
          return send(200, { hasLicense: false, token });
        }
      }
    })
    .then(data => res.status(data.status).send(data))
    .catch(err => send(500, err.message || err)); // LOGGER
  } else {
    // ================== PROBAR
    res.status(status.BAD_REQUEST).send({
      status: status.BAD_REQUEST,
      message: 'Invalid email address'
    });    
    console.log(status.BAD_REQUEST);
  }
}

const login = async (req,res) => {
  const send = (status, body) => res.status(status).send({ status, body });
  const { username, password } = req.body;
  
  console.log(req.body)
  const user = new UserDAO(db);
  try {
    console.log(username)
    let index = validator.isEmail(username) ? 'email' : 'username';
    let _user = await user.find(index, username, ['fk_core_license', 'pk_core_app_user', 'email', 'username', 'firstname', 'lastname', 'password']);
    _user = _user[0];
    if(_user) {
      const isMatch = await crypt.compare(password, _user.password);

      if (isMatch) {
        let hasLicense = _user.fkcorelicense ? true : false;
        let token = hasLicense ? signToken({ userId: _user.pkcoreappuser, licenseId: _user.fkcorelicense }) : signToken({ userId: _user.pkcoreappuser });
        delete _user['password'];
        delete _user['pkcoreappuser'];
        delete _user['fkcorelicense'];
        send(200, {
          hasLicense,
          token,
          ..._user
        });
      } else {
        send(400, { message: 'Invalid credentials' })
      }
    } else {
      send(200, { message: 'User does not exist'});
    }    
  } catch(err) {
    console.log(err);
    send(500, err.message || err);
  }
}

export default {
  signup,
  login,
  userData
}