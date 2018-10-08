import status from 'http-status';
import { deviceService } from '../services';

const get = async (req, res) => {
  const { licenseId } = req.ids;
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.get(licenseId)
  .then(data => {
    send(200, data)
  })
  .catch(err => {
    console.log(err)
    send(400, err.message || err);
  });
}

export default {
  get,
}