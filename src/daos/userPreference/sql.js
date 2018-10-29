export default {
  /**
   * 
   */
  CREATE_PREFERENCES: 'INSERT INTO main_device_preference (fk_core_app_user, fk_core_device) VALUES ($1,$2) RETURNING pk_main_device_pref AS id',

  /**
   * 
   */
  DEVICE_PREFERENCE: 'SELECT Mnt.name, Mnp.status, Mnp.pk_main_not_pref AS id FROM main_device_preference AS Mdp INNER JOIN main_notification_preference Mnp on Mdp.pk_main_device_pref = Mnp.fk_main_device_pref INNER JOIN main_device_notification Mdn on Mnp.fk_main_device_not = Mdn.pk_main_device_not INNER JOIN main_notification_type Mnt on Mdn.fk_main_not_type = Mnt.pk_main_not_type WHERE Mdp.fk_core_app_user = $1 AND Mdp.fk_core_device = $2;',

  /**
   * 
   */
  SET_PREFERENCE: 'UPDATE main_notification_preference SET status = $2 WHERE pk_main_not_pref = $1',
}