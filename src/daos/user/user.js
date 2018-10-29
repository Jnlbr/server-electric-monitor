import sql from './sql';
import QueryMaker from "../../util/queryMaker";

class User {
  constructor(db) {
    this.db = db;
    this.qm = new QueryMaker();
    this.table = 'core_app_user';
  }
  
  create({email,username,firstname,lastname,password}) {
    return this.db.one(sql.USER_CREATE,[email,username,password,firstname,lastname]);
  }
  update({column,value,userId}) {
    return this.db.none(sql.USER_UPDATE, [column,value,userId]);
  }
  exist(column, value) {
    return this.db.oneOrNone(sql.FIELD_EXIST, [column,value]);
  }
  select({column,alias,userId}) {
    return this.db.oneOrNone(sql.USER_SELECT, [column, alias, userId]);
  }
  find(index, value, columns) {
    let query = this.qm.select(this.table, columns).equal(index,value).make();
    return this.db.any(query);
  }
}

export default User;