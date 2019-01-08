export default {

  /**
   * 
   */
  ADD: 'INSERT INTO core_device (fk_core_device_type, fk_core_license, name, voltage) VALUES($1, $2, $3, $4) RETURNING pk_core_device AS id;',  

  // ADD INNER JOIN TO LEVEL
  /**
   * 
   */
  FIND_BY_LICENSE: `
    SELECT D.active, D.name, D.voltage, D.pk_core_device AS id, D.fk_core_level AS levelId, D.status,
      D.fk_core_device_type AS deviceTypeId, MNP.status as notifiable
    FROM core_device AS D
      INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device
      INNER JOIN main_notification_preference MNP on DP.pk_main_device_pref = MNP.fk_main_device_pref
    WHERE DP.fk_core_app_user = $1
  `,


  FIND_BY_ID: `
    SELECT D.active, D.name, D.voltage, D.pk_core_device AS id, D.fk_core_level AS levelId, 
      D.status, D.fk_core_device_type AS deviceTypeId, MNP.status as notifiable
    FROM core_device AS D 
      INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device 
      INNER JOIN main_notification_preference MNP on DP.pk_main_device_pref = MNP.fk_main_device_pref
    WHERE D.pk_core_device = $1
  `,

  FIND: `
    SELECT D.active, D.name, D.voltage, D.pk_core_device AS id, D.fk_core_level AS levelId, 
        D.status, D.fk_core_device_type AS deviceTypeId
      FROM core_device AS D
      WHERE D.pk_core_device = $1
  `,  
  /**
   * 
   */
  FIND_BY_ID_AND_USER: `
    SELECT D.active, D.name, D.voltage, D.pk_core_device AS id, D.fk_core_level AS levelId, 
      D.status, D.fk_core_device_type AS deviceTypeId, MNP.status as notifiable
    FROM core_device AS D 
      INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device 
      INNER JOIN main_notification_preference MNP on DP.pk_main_device_pref = MNP.fk_main_device_pref
    WHERE D.pk_core_device = $1 
      AND DP.fk_core_app_user = $2`,

  UPDATE_PREFERENCE: `
    UPDATE main_notification_preference AS MNP
    SET status = $3
    WHERE MNP.pk_main_not_pref = (
      SELECT noti.pk_main_not_pref
      FROM core_device AS D
        INNER JOIN main_device_preference AS DP ON DP.fk_core_device = D.pk_core_device
        INNER JOIN main_notification_preference AS noti on DP.pk_main_device_pref = noti.fk_main_device_pref
        INNER JOIN core_app_user AS CAU ON CAU.pk_core_app_user = DP.fk_core_app_user
      WHERE D.pk_core_device = $2
      AND CAU.pk_core_app_user = $1
      LIMIT 1
    );`,

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