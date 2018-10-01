import sql from './sql';

class Level {
  constructor(db) {
    this.db = db;
  }

  create(name,order,license,id = null) {
    return this.db.one(sql.LEVEL_CREATE, [name,order,license,id]);
  }
  update() {

  }
  delete() {

  }
  find() {

  }
  high(license, order = null) {
    let query = order? sql.LEVEL_HIGH_NOT : sql.LEVEL_HIGH_NULL;
    if (order)
      return this.db.oneOrNone(query, [license, order]);
    else {
      return this.db.oneOrNone(query, [license]);
    }
  }
}

export default Level;