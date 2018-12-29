import sql from './sql';
import QueryMaker from '../../util/queryMaker';

class Device {
  constructor(db) {
    this.db = db;
    this.qm = new QueryMaker();
    this.table = 'core_device';
  }
  create(deviceType,licenseId,name, voltage) {
    return this.db.one(sql.ADD, [deviceType,licenseId,name,voltage]);
  }
  find(index,value,columns) {
    let query = this.qm.select(this.table, columns).equal(index, value).make();
    return this.db.any(query);
  }
  updateName(id, name) {
    return this.db.none(sql.UPDATE_NAME, [id,name]);
  }
  getAll(userId) {
    return this.db.any(sql.FIND_BY_LICENSE, [userId]);
  }
  updateStatus(id,status) {
    return this.db.none(sql.UPDATE_STATUS, [id,status]);
  }
  delete(id) {
    return this.db.none(sql.DELETE, [id]);
  }
  updateActive(id, active) {
    return this.db.none(sql.UPDATE_ACTIVE, [id,active])
  }
}

export default Device;