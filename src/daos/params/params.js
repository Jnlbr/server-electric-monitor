import sql from './sql';

class Params {
  constructor(db) {
    this.db = db;
  }

  add(id,params) {
    return this.db.none(sql.INSERT_PARAMS, [id, params.current, params.power]);
  }

  getMonths(deviceId) {
    return this.db.manyOrNone(sql.GET_MONTH, [deviceId]);
  }

  getAllMonths(licenseId) {
    return this.db.manyOrNone(sql.GET_ALL_MONTH, [licenseId])
  }

  getCurrentByMonth(deviceId, year, month) {
    return this.db.manyOrNone(sql.GET_CURRENT_BY_MONTH, [deviceId, year, month])
  }

  getPowerByMonth(deviceId, year, month) {
    return this.db.manyOrNone(sql.GET_POWER_BY_MONTH, [deviceId, year, month])
  }

  getAllCurrentByMonth(licenseId, year, month) {
    return this.db.manyOrNone(sql.GET_ALL_CURRENT_BY_MONTH, [licenseId, year, month])
  }

  getAllPowerByMonth(licenseId,year,month) {
    return this.db.manyOrNone(sql.GET_ALL_POWER_BY_MONTH, [licenseId, year, month])
  }

  getTotal(year, month) {
    return this.db.many(sql.GET_TOTAL, [year, month]);
  }
}

export default Params;