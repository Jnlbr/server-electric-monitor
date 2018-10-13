import db from '../config/db';
import { DeviceDAO } from '../daos';

// METER MAS MANO
function getByUser(userId) {
  return db.task(async t => {
    const deviceDAO = new DeviceDAO(t);

    try {
      let devices = await deviceDAO.findByUser(userId);

      return devices;
    } catch(err) {
      throw err;
    }
  });
}

export default {
  getByUser,
}