import status from 'http-status';
import { deviceService } from '../services';

const getAll = (req, res) => {
  const { userId } = req.ids;
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.getAll(userId)
  .then(data => {
    send(200, data)
  })
  .catch(err => {
    console.log(err)
    send(400, err.message || err);
  });
}

const getPreference = (req,res) => {
  const { userId } = req.ids;
  const { deviceId } = req.params;
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.getPreference(userId,deviceId)
  .then(data => {
    send(200, data);
  })
  .catch(err => {
    console.log(err);
    send(400, err.message || err);
  });
}

const setPreference = (req,res) => {
  const { preferences } = req.body;
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.setPreference(preferences)
  .then(() => {
    send(200, { message: 'Success' });
  })
  .catch(err => {
    send(400, err.message || err);
  })
}

const updateName = (req,res) => {
  const { id, name } = req.body;
  // const { userId } = req.ids;
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.updateName(id,name)
  .then(() => {
    send(200, { message: 'Success' });
  })
  .catch(err => {
    send(400, err.message || err)
  })
}

export default {
  getAll,
  getPreference,
  setPreference,
  updateName
}