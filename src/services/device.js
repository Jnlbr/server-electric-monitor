import db from '../config/db';
import { DeviceDAO } from '../daos';

// METER MAS MANO
function get(licenseId) {
  return db.task(async t => {
    const deviceDAO = new DeviceDAO(t);

    try {
      let devices = await deviceDAO.get(licenseId);

      return licenseId;
    } catch(err) {
      throw err;
    }
  });
}

export default {
  get,
}