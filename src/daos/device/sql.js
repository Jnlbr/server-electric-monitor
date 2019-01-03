export default {

  /**
   * 
   */
  ADD: 'INSERT INTO core_device (fk_core_device_type, fk_core_license, name, voltage) VALUES($1, $2, $3, $4) RETURNING pk_core_device AS id;',  

  // ADD INNER JOIN TO LEVEL
  /**
   * 
   */
  FIND_BY_LICENSE: 'SELECT D.active, D.name, D.voltage, D.pk_core_device AS id, D.fk_core_level AS levelId, D.status, D.fk_core_device_type AS deviceTypeId, DP.pk_main_device_pref AS devicePreferenceId FROM core_device AS D INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device WHERE DP.fk_core_app_user = $1',


  FIND_BY_ID: 'SELECT * FROM core_device WHERE pk_core_device = $1',

  /**
   * 
   */
  FIND_BY_ID_AND_USER: 'SELECT D.active, D.name, D.voltage, D.pk_core_device AS id, D.fk_core_level AS levelId, D.status, D.fk_core_device_type AS deviceTypeId, DP.pk_main_device_pref AS devicePreferenceId FROM core_device AS D INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device WHERE D.pk_core_device = $1 AND DP.fk_core_app_user = $2',

  /**
   * 
   */
  UPDATE_DATA: 'UPDATE core_device SET name = $2, voltage = $3 WHERE pk_core_device = $1',
  
  /**
   * 
   */
  UPDATE_STATUS: 'UPDATE core_device SET status = $2 WHERE pk_core_device = $1',

  /**
   * 
   */
  DELETE: 'DELETE FROM core_device WHERE pk_core_device = $1',

  /**
   * 
   */
  UPDATE_ACTIVE: 'UPDATE core_device SET active = $2 WHERE pk_core_device = $1'
}