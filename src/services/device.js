import db from '../config/db';
import { DeviceDAO, UserPreferenceDAO, ParamsDAO } from '../daos';

async function updateActive(id,active) {
  const deviceDAO = new DeviceDAO(db);

  try {
    await deviceDAO.updateActive(id,active)
    return;
  } catch (err) {
    throw err;
  }
}

async function deleteDevice(id) {
  const deviceDAO = new DeviceDAO(db);

  try {
    await deviceDAO.delete(id)
    return;
  } catch(err) {
    throw err;
  }
}

// METER MAS MANO
function getAll(userId) {
  return db.task(async t => {
    const deviceDAO = new DeviceDAO(t);

    try {
      let devices = await deviceDAO.getAll(userId);

      return devices;
    } catch(err) {
      throw err;
    }
  });
}

function setPreference(preferences) {

  return db.tx(async t => {
    const userPreferenceDAO = new UserPreferenceDAO(t);
    let queries = [];

    preferences.forEach(pref => {
      queries.push(userPreferenceDAO.setDevicePreference(pref.id, pref.status));
    })
    return await t.batch(queries);
  });
}

async function updateData(id, userId, { name, voltage, notifiable }) {
  const deviceDAO = new DeviceDAO(db);

  try {
    await deviceDAO.updateData(id, { name, voltage });
    await deviceDAO.updatePreference(id, userId, notifiable);
    return await deviceDAO.findByIdAndUser(id,userId);
  } catch (err) {
    throw err;
  }
}

async function getParams(id, from) {
  const paramsDAO = new ParamsDAO(db);

  try {

  } catch(err) {
    throw err;
  }
}

async function getAllParams(id, from) {
  const paramsDAO = new ParamsDAO(db);

  try {

  } catch (err) {
    throw err;
  }
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