import sql from './sql';
import QueryMaker from '../../util/queryMaker';

class UserPreference {
  constructor(db) {
    this.db = db;
    this.qm = new QueryMaker(db);
  }
  // CREATES
  create(userId, deviceId) {
    return this.db.one(sql.CREATE_PREFERENCE, [userId, deviceId]);
  }
}

export default UserPreference;