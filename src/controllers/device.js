import status from 'http-status';
import { deviceService } from '../services';

const getByUser = async (req, res) => {
  const { userId } = req.ids;
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.getByUser(userId)
  .then(data => {
    send(200, data)
  })
  .catch(err => {
    console.log(err)
    send(400, err.message || err);
  });
}

export default {
  getByUser,
}