import { hardwareService, notificationService } from "../services";

const addParams = (req,res) => {
  let socket = req.socket;
  const { id, params } = req.body;
  const send = (status, body) => res.status(status).send({ status, body });

  hardwareService.add(id,params)
  .then(() => {
    socket.of('/user').emit('params:' + id, {
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
  let socket = req.socket;

  console.log('Device: ' + id + ' fue encendido? ' + status);

  hardwareService.updateStatus(id, status)
  .then(() => {
    socket.emit('stateChange:' + id, {
     state: status
    });
    let message = status ? 'Dispositivo encendido' : ' Dispositivo apagado';
    notificationService.sendMessage(req.ids.licenseId, message);
    send(200, { message: 'Success' });
  })
  .catch(err => {
    send(400, err.message || err)
  });
}

const getMonths = (req,res) => {
  let id = req.params.id;
  const send = (status, body) => res.status(status).send({ status, body });

  hardwareService.getMonths(id)
  .then(data => {
    send(200, data);
  })
  .catch(err => {
    send(400, err.message || err);
  })
}

const getAllMonths = (req,res) => {
  const { licenseId } = req.ids;
  const send = (status, body) => res.status(status).send({ status, body });

  hardwareService.getAllMonths(licenseId)
  .then(data => {
    send(200, data);
  })
  .catch(err => {
    send(400, err.message || err);
  })
}

const getByMonth = (req, res) => {
  const { id, year, month } = req.params;
  const send = (status, body) => res.status(status).send({ status, body });

  hardwareService.getByMonth(id,year,month)
  .then(data => {
    send(200, [
      {
        seriesName: 'Current',
        data: data[0],
        color: 'blue'
      }, {
        seriesName: 'Power',
        data: data[1],
        color: 'green'
      }
    ]);
  })
  .catch(err => {
    console.log(err);
    send(400, err);
  })
}

const getAllByMonth = (req,res) => {
  const { year, month } = req.params;
  const { licenseId } = req.ids;
  const send = (status, body) => res.status(status).send({ status, body });

  hardwareService.getAllByMonth(licenseId,year,month)
  .then(data => {
    send(200, data);    
  })
  .catch(err => {
    send(400, err.message || err);
  })
}

export default {
  updateStatus,
  addParams,
  getMonths,
  getAllMonths,
  getByMonth,
  getAllByMonth
}