import sql from './sql';
import QueryMaker from '../../util/queryMaker';

class Device {
  constructor(db) {
    this.db = db;
    this.qm = new QueryMaker();
    this.table = 'core_device';
  }

  create(deviceType,licenseId,name,status) {
    return this.db.one(sql.DEVICE_ADD, [deviceType,licenseId,name,status]);
  }
  find(index,value,columns, inner = null) {
    let query;
    if(inner) {
      query = this.qm.select(this.table, columns).inner(inner, 'fk_core_device_type', 'pk_core_device_type').equal(index, value).make();
    } else {
      query = this.qm.select(this.table, columns).equal(index, value).make();
    }
    return this.db.any(query);
  }
  findNotificationByType(type) {
    return this.db.any(sql.FIND_NOTIFICATION_BY_TYPE, [type]);
  }
  get(licenseId) {
    return this.db.any(sql.DEVICE_GET, [licenseId]);
  }
}

export default Device;