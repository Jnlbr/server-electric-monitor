export default {
  /**
   * 
   */
  USER_UPDATE: `
    UPDATE core_app_user SET $1~ = $2 
    WHERE pk_core_app_user = $3;
  `,
  
  /**
   * 
   */
  USER_SELECT: `
    SELECT $1~ AS $2~ 
    FROM core_app_user 
    WHERE core_app_user.pk_core_app_user = $3
  `,

  /**
   * 
   */
  USER_FIND: `
    SELECT $1~ 
    FROM core_app_user 
    WHERE core_app_user.$1~ = $2
  `,
  
  /**
   * 
   */
  USER_CREATE: `
    INSERT INTO core_app_user (email, username, password, name) 
    VALUES ($1,$2,$3,$4) 
    RETURNING pk_core_app_user AS id
  `,

  /**
   * 
   */
  FIELD_EXIST: `
    SELECT pk_core_app_user 
    FROM core_app_user 
    WHERE $1~ = $2
  `,

  /**
   * 
   */
  GET_TOKENS: `
    SELECT CAU.notification_token as token
    FROM core_app_user AS CAU
      INNER JOIN core_license cl on CAU.fk_core_license = cl.pk_core_license
      INNER JOIN main_device_preference MDP on CAU.pk_core_app_user = MDP.fk_core_app_user
      INNER JOIN main_notification_preference MNP on MDP.pk_main_device_pref = MNP.fk_main_device_pref
    WHERE cl.pk_core_license = $1
      AND MDP.fk_core_device = $2
      AND MNP.status = true
      AND CAU.notification_token IS NOT NULL;
  `,
}