import db from '../config/db';
import { DeviceDAO } from '../daos';

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

export default {
  getAll,
}