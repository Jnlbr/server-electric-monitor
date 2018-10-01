export default {

  DEVICE_ADD: 'INSERT INTO core_device (fk_core_device_type, fk_core_license, name, status) VALUES($1, $2, $3, $4) RETURNING pk_core_device AS id;',  

}