import db from '../config/db';
import { ParamsDAO } from '../daos';


async function add(id, params) {
  const paramsDAO = new ParamsDAO(db);

  try {
    return await paramsDAO.add(id, params);
  } catch (err) {
    throw err;
  }
}

export default {
  add
}