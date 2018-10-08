import status from 'http-status';
import db from '../config/db';
import { LevelDAO } from '../daos';

const create = async (req,res) => {
  const { licenseId } = req.ids;
  let { name, levelId } = req.body;
  
  levelId = levelId == 0 ? null : levelId;
  db.task(async t => {
    const level = new LevelDAO(t);
    let high = await level.high(licenseId, levelId)
    let order = high ? high.order + 1 : 1;
    
    let _level = await level.create(name,order,licenseId,levelId);

    // Como en este momento, el ultimo ingresado, SIEMPRE va a estar al final del nivel al que pertenece
    // No me interesa devolverle el "Order", dado que puedo manejarlo facilmente a nivel de App
    // De forma que con devolver el id del nivel, es suficiente.
    return {
      levelId: _level.levelid,
    };
  })
  .then(data => res.send({body:data}))
  .catch(err => res.send(err.message || err));
}

export default {
  create,
}