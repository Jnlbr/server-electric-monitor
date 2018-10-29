import sql from './sql';
// import QueryMaker from '../../util/queryMaker';

class UserPreference {
  constructor(db) {
    this.db = db;
  }
  create(userId, deviceId) {
    return this.db.one(sql.CREATE_PREFERENCES, [userId, deviceId]);
  }
  getDevicePreference(userId, deviceId) {
    return this.db.many(sql.DEVICE_PREFERENCE, [userId, deviceId]);
  }
  setDevicePreference(id, status) {
    return this.db.none(sql.SET_PREFERENCE, [id,status]);
  }
}

export default UserPreference;