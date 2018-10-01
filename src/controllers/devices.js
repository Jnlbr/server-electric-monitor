import status from 'http-status';
import db from '../config/db';
import { LevelDAO } from '../daos';

const createLevel = async (req,res) => {
  const { licenseId } = req.ids;
  let { name, levelId } = req.body;
  
  levelId = levelId == 0 ? null : levelId;
  db.task(async t => {
    const level = new LevelDAO(t);
    let high = await level.high(licenseId, levelId)
    let order = high ? high.order + 1 : 1;
    
    let _level = await level.create(name,order,licenseId,levelId);

    return _level;
  })
  .then(data => res.send({order:data}))
  .catch(err => res.send(err.message || err));
}

export default {
  createLevel,
}