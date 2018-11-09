import { hardwareService } from "../services";

const addParams = (req,res) => {
  let socket = req.socket;
  const { id, params } = req.body;
  const send = (status, body) => res.status(status).send({ status, body });
  // socket.emit('test', { hola: 'hola' });
  // console.log('test');
  // res.send('s')

  hardwareService.add(id,params)
  .then(() => {
    socket.emit('params:' + id, {
      ...params,
    });
    send(200, { 'message': 'success' });
  })
  .catch(err => {
    console.log('Hardware controller error: ' + err.message || err);
    send(400, err.message || err)
  });
}

const updateStatus = (req,res) => {
  const { id, status } = req.body;
  const send = (status, body) => res.status(status).send({ status, body });

  hardwareService.updateStatus(id, status)
  .then(() => {
    send(200, { message: 'Success' });
  })
  .catch(err => {
    send(400, err.message || err)
  });
}

export default {
  updateStatus,
  addParams
}