export default {

  LICENSE_FIND: 'SELECT core_license.pk_core_license AS id, core_license.status FROM core_license WHERE code = $1;',

}