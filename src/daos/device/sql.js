export default {

  DEVICE_ADD: 'INSERT INTO core_device (fk_core_device_type, fk_core_license, name, status) VALUES($1, $2, $3, $4) RETURNING pk_core_device AS id;',  

  // ADD INNER JOIN TO LEVEL
  DEVICE_GET: 'SELECT core_device.pk_core_device AS deviceId, core_device.fk_core_level AS levelId, core_device.name, core_device.status FROM core_device WHERE core_device.fk_core_license = $1'

}