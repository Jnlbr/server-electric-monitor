import { hardwareService, notificationService } from "../services";

const addParams = (req,res) => {
  let { id, current } = req.body;
  const send = (status, body) => res.status(status).send({ status, body });
  
  if(current == null || current == '' || isNaN(current)) {
    let log = 'Current must not be null';
    console.log(`
      PACKAGE: controllers/hardware
      METHOD: addParams
      ERROR: ${log}
    `);
    send(400, log);
  } else {
    current = parseFloat(current);
    hardwareService.add(id, current)
      .then((params) => {
        req.socket.of('/user').emit('params:' + id, {
          ...params
        });
        send(200, { 'message': 'success' });
      })
      .catch(err => {
        console.log(`
      PACKAGE: controllers/hardware
      METHOD: addParams
      ERROR: ${err.message || err}
    `);
        send(400, err.message || err)
      });
  }
}

const updateStatus = (req,res) => {
  const { id, status } = req.body;
  const send = (status, body) => res.status(status).send({ status, body });
  let socket = req.socket;

  console.log('Device: ' + id + ' fue encendido? ' + status);

  hardwareService.updateStatus(id, status)
  .then(() => {
    socket.emit('stateChange:' + id, status);
    let message = status ? ' fue encendido' : ' fue apagado';
    notificationService.sendMessage(req.ids.licenseId, id, message);
    send(200, { message: 'Success' });
  })
  .catch(err => {
    console.log(`
      PACKAGE: controllers/hardware
      METHOD: updateStatus
      ERROR: ${err.message || err}
    `);
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
    console.log(`
      PACKAGE: controllers/hardware
      METHOD: getMonths
      ERROR: ${err.message || err}
    `);
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
    console.log(`
      PACKAGE: controllers/hardware
      METHOD: getAllMonths
      ERROR: ${err.message || err}
    `);
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
        seriesName: 'Corriente (A)',
        data: data[0],
        color: 'blue'
      }, {
        seriesName: 'Potencia (W)',
        data: data[1],
        color: 'green'
      }
    ]);
  })
  .catch(err => {
    console.log(`
      PACKAGE: controllers/hardware
      METHOD: getByMonths
      ERROR: ${err.message || err}
    `);
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
    console.log(`
      PACKAGE: controllers/hardware
      METHOD: getAllByMonths
      ERROR: ${err.message || err}
    `);
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