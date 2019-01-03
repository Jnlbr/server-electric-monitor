import db from '../config/db';
import { ParamsDAO, DeviceDAO } from '../daos';

async function add(id, current) {
  return db.tx(async t => {
    const paramsDAO = new ParamsDAO(t);
    const deviceDAO = new DeviceDAO(t);
    try {
      let device = await deviceDAO.findById(id);
      let power = current * device.voltage;            
      await paramsDAO.add(id, {current,power})      
      power = Math.round((current * device.voltage) * 100) / 100
      current = Math.round(current * 100) / 100
      console.log({ current, power })
      return { amps: current, watts: power };
    } catch (err) {
      throw err;
    }
  });
}

async function updateStatus(id, status) {
  const deviceDAO = new DeviceDAO(db);

  try {
    return await deviceDAO.updateStatus(id, status);
  } catch (err) {
    throw err;
  }
}


async function getMonths(deviceId) {
  const paramsDAO = new ParamsDAO(db);

  try {
    return await paramsDAO.getMonths(deviceId);
  } catch (err) {
    throw err;
  }
}

async function getAllMonths(licenseId) {
  const paramsDAO = new ParamsDAO(db);

  try {
    return await paramsDAO.getAllMonths(licenseId);
  } catch (err) {
    throw err;
  }
}

async function getByMonth(deviceId,year,month) {
  return db.tx(async t => {
    const paramsDAO = new ParamsDAO(t);
    let queries = [];

    queries.push(paramsDAO.getCurrentByMonth(deviceId,year,month));
    queries.push(paramsDAO.getPowerByMonth(deviceId,year,month));
    
    return await t.batch(queries);
  });
}

async function getAllByMonth(licenseId,year,month) {
  return db.tx(async t => {
    const paramsDAO = new ParamsDAO(t);
    let queries = [];

    queries.push(paramsDAO.getAllCurrentByMonth(licenseId, year, month));
    queries.push(paramsDAO.getAllPowerByMonth(licenseId, year, month));

    return await t.batch(queries);
  })
  .then(data => {
    let colors = [];
    let current = group(data[0], colors);
    let power = group(data[1], colors);

    // return [
    //   {
    //     seriesName: 'Current',
    //     data: current
    //   }, {
    //     seriesName: 'Power',
    //     data: power
    //   }
    // ]
    return { current, power }
  })
  .catch(err => {
    throw err;
  })
}

export default {
  add,
  updateStatus,
  getMonths,
  getAllMonths,
  getByMonth,
  getAllByMonth
}

function randomColor() { 
  let colors = ['blue', 'green', 'red', 'purple', 'yellow', 'gray']
  return colors[Math.floor(Math.random() * colors.length)];
}

function group(data, colors = []) {
  let values = [];
  data.forEach(row => {
    let index = -1;
    values.forEach((val, i) => {
      if (val.id == row.id) {
        index = i;
      }
    });
    if (index > -1) {
      values[index].data.push({
        x: row.x,
        y: row.y
      })
    } else {
      let val = colors.find(c => c.id === row.id);
      let color;
      if(val) {
        color = val.color;
      } else {
        color = randomColor();
        colors.push({
          id: row.id,
          color: color
        })
      }
      values.push({
        id: row.id,
        seriesName: row.name,
        color: color,
        data: [{
          x: row.x,
          y: row.y
        }]
      })
    }
  });
  return values;
}