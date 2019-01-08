import { registerService } from '../services';

const deviceRegister = async (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});
  const { type, name, voltage } = req.body;
  const { licenseId, userId } = req.ids;
  console.log('DEVICE REGISTER')
  console.log(licenseId);
  console.log(req.body);

  registerService.deviceRegister(licenseId, userId, req.body)
  .then(({status,body}) => send(status,body))
  .catch(err => {
    // ADD LOGGER
    console.log('DEVICE REGISTER ERR: ' + err.message)
    console.log(err);
    send(500, err.message || err);
  }); 
}

const tokenRegister = async (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});
  const token = req.body.token;
  const { userId } = req.ids;

  console.log('token register')
  registerService.tokenRegister(userId, token)
  .then(({status,body}) => send(status,body))
  .catch(err => {
    // ADD LOGGER
    console.log('SET NOTIFICATION TOKEN ERR: ');
    console.log(err);
    send(500, err.message || err);
  })
}

export default {
  deviceRegister,
  tokenRegister
}