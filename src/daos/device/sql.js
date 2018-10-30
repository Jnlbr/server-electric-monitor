export default {

  /**
   * 
   */
  ADD: 'INSERT INTO core_device (fk_core_device_type, fk_core_license, name, status) VALUES($1, $2, $3, $4) RETURNING pk_core_device AS id;',  

  // ADD INNER JOIN TO LEVEL
  /**
   * 
   */
  FIND_BY_LICENSE: 'SELECT D.name, D.pk_core_device AS deviceId, D.fk_core_level AS levelId, D.fk_core_device_type AS deviceTypeId, DP.pk_main_device_pref AS devicePreferenceId FROM core_device AS D INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device WHERE DP.fk_core_app_user = $1',

  /**
   * 
   */
  UPDATE_FIELD: 'UPDATE core_device SET name = $2 WHERE pk_core_device = $1'

}