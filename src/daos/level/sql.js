export default {

  LEVEL_CREATE: 'INSERT INTO core_level (name, order_number, fk_core_license, fk_core_level) VALUES ($1,$2,$3,$4) RETURNING pk_core_level AS pkcorelevel',

  LEVEL_HIGH_NULL: 'SELECT core_level.order_number as order FROM core_level WHERE fk_core_license = $1 AND fk_core_level IS NULL ORDER BY order_number DESC LIMIT 1',
  LEVEL_HIGH_NOT: 'SELECT core_level.order_number as order FROM core_level WHERE fk_core_license = $1 AND fk_core_level = $2 ORDER BY order_number DESC LIMIT 1',

}