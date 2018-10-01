import { registerService } from '../services';

const userRegister = async (req,res) => {
  const send = (status,body) => res.status(status).send({ status, body });
  const { userId } = req.ids;
  const code = req.body.code;
  
  registerService.userRegister(userId,code)
  .then(({status,body}) => send(status,body))
  .catch(err => {
    // ADD LOGGER
    console.log('USER REGISTER ERR: ' + err.message);
    console.log(err);
    send(500, err.message || err);
  });
}

const deviceRegister = async (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});
  const { type, code, name, status } = req.body;

  registerService.deviceRegister(type,code,name,status)
  .then(({status,body}) => send(status,body))
  .catch(err => {
    // ADD LOGGER
    console.log('DEVICE REGISTER ERR: ' + err.message)
    console.log(err);
    send(500, err.message || err);
  }); 
}

export default {
  userRegister,
  deviceRegister
}