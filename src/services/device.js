import db from '../config/db';
import { DeviceDAO, UserPreferenceDAO, ParamsDAO } from '../daos';

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

async function getPreference(userId, deviceId) {
  const userPreferenceDAO = new UserPreferenceDAO(db);

  try {
    const preferences = userPreferenceDAO.getDevicePreference(userId,deviceId);
    return preferences;
  } catch(err) {
    throw err;
  }
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

async function updateName(id,name) {
  const deviceDAO = new DeviceDAO(db);

  try {
    return await deviceDAO.updateName(id,name);
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
  getPreference,
  setPreference,
  updateName,
  getParams,
  getAllParams,
  deleteDevice
}