import status from 'http-status';
import { deviceService } from '../services';

const updateActive = (req,res) => {
  const send = (status, body) => res.status(status).send({ status, body });
  const { id, active } = req.body;

  deviceService.updateActive(id,active)
  .then(() => {
    let message = active ? 'activated':'desactivated';
    console.log(active)
    send(200, `Success, device was ${message}`);
  })
  .catch(err => {
    send(400, err.message || err);
  })
}

const deleteDevice = (req,res) => {
  const send = (status,body) => res.status(status).send({status,body});

  deviceService.deleteDevice(req.body.id)
  .then(() => {
    send(200, 'Success');
  })
  .catch(err => {
    send(400, err.message || err);
  })
}

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

const getParams = (req,res) => {
  const { id, from } = req.params;

  deviceService.getParams(id,from)
  .then(data => {

  })
  .catch(err => {

  })
}

const getAllParams = (req,res) => {
  const { from } = req.params;

  deviceService.getParams(id, from)
  .then(data => {

  })
  .catch(err => {

  })
}

const updateData = (req,res) => {
  const { id, name, voltage, notifiable } = req.body;
  const { userId } = req.ids;
  const send = (status,body) => res.status(status).send({status,body});
  console.log(`
    PACKAGE: controllers/device
    METHOD: updateData
    MESSAGE: method init
  `);
  deviceService.updateData(id, userId, { name, voltage, notifiable })
  .then((data) => {
    send(200, data);
  })
  .catch(err => {
    console.log(`
      PACKAGE: controllers/device
      METHOD: updateData
      ERROR: ${err}
    `);
    send(400, err.message || err)
  })
}

export default {
  getAll,
  setPreference,
  updateData,
  getParams,
  getAllParams,
  deleteDevice,
  updateActive
}