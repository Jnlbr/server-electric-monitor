export default {
  
  CREATE_PREFERENCE: 'INSERT INTO main_device_preference (fk_core_app_user, fk_core_device) VALUES ($1,$2) RETURNING pk_main_device_pref AS id',

}