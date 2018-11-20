import sql from './sql';
// import QueryMaker from '../../util/queryMaker';

class Params {
  constructor(db) {
    this.db = db;
  }

  add(id,params) {
    return this.db.none(sql.INSERT_PARAMS, [id, params.amps, params.watts]);
  }

}

export default Params;