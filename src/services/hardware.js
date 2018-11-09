import db from '../config/db';
import { ParamsDAO, DeviceDAO } from '../daos';

async function add(id, params) {
  const paramsDAO = new ParamsDAO(db);

  try {
    return await paramsDAO.add(id, params);
  } catch (err) {
    throw err;
  }
}

async function updateStatus(id, status) {
  const deviceDAO = new DeviceDAO(db);

  try {
    return await deviceDAO.updateStatus(id, status);
  } catch (err) {
    throw err;
  }
}

export default {
  add,
  updateStatus
}