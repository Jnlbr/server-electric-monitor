export default {

  /** Models
   * UPDATE core_app_user SET fk_core_license = $1 WHERE pk_core_app_user = $2
   */
  USER_UPDATE: 'UPDATE core_app_user SET $1~ = $2 WHERE pk_core_app_user = $3;',
  /** Models
   * SELECT core_app_user.fk_core_license AS id FROM core_app_user WHERE core_app_user.pk_core_app_user = $1
   */
  USER_SELECT: 'SELECT $1~ AS $2~ FROM core_app_user WHERE core_app_user.pk_core_app_user = $3',
  /** Models
   * SELECT core_app_user.email AS email FROM core_app_user WHERE core_app_user.email = $1
   * SELECT core_app_user.username AS username FROM core_app_user WHERE core_app_user.username = $1
   */
  USER_FIND: 'SELECT $1~ FROM core_app_user WHERE core_app_user.$1~ = $2',
  /**
   * 
   */
  USER_CREATE: 'INSERT INTO core_app_user (email, username, password, firstname, lastname) VALUES ($1,$2,$3,$4,$5) RETURNING pk_core_app_user AS id',

  /**
   * 
   */
  FIELD_EXIST: 'SELECT pk_core_app_user FROM core_app_user WHERE $1~ = $2',

  /**
   * 
   */
  GET_TOKENS: 'SELECT CAU.notification_token as token FROM core_app_user AS CAU INNER JOIN core_license cl on CAU.fk_core_license = cl.pk_core_license WHERE cl.pk_core_license = $1 AND CAU.notification_token IS NOT NULL;'
}