import sql from './sql';
import QueryMaker from '../../util/queryMaker';

class Device {
  constructor(db) {
    this.db = db;
    this.qm = new QueryMaker();
    this.table = 'core_device';
  }
  create(deviceType,licenseId,name,status) {
    return this.db.one(sql.ADD, [deviceType,licenseId,name,status]);
  }
  find(index,value,columns) {
    let query = this.qm.select(this.table, columns).equal(index, value).make();
    return this.db.any(query);
  }
  updateName(id, name) {
    return this.db.none(sql.UPDATE_FIELD, [id,name]);
  }
  getAll(userId) {
    return this.db.any(sql.FIND_BY_LICENSE, [userId]);
  }
}

export default Device;