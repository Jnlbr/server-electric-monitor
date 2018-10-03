import sql from './sql';

class License {
  constructor(db) {
    this.db = db;
  }
  select(code) {
    return this.db.oneOrNone(sql.LICENSE_FIND, [code]);
  }
}

export default License;