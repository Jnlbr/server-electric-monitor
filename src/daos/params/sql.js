export default {
  /**
   * 
   */
  INSERT_PARAMS: 'INSERT INTO main_device_params (fk_core_device, amps, watts, time) VALUES($1, $2, $3, NOW())',

  /**
   * 
   */
  GET_ALL_MONTH: 'SELECT extract(year from time) as year, extract(month from time) as month FROM main_device_params AS MDP INNER JOIN core_device AS CD ON CD.pk_core_device = MDP.fk_core_device INNER JOIN core_license AS CL ON CL.pk_core_license = CD.fk_core_license WHERE pk_core_license = $1 GROUP BY year, month ORDER BY month',

  /**
   * 
   */
  GET_MONTH: 'SELECT extract(year from time) as year, extract(month from time) as month FROM main_device_params AS MDP INNER JOIN core_device AS CD ON CD.pk_core_device = MDP.fk_core_device WHERE pk_core_device = $1 GROUP BY year, month ORDER BY month',

  /**
   * 
   */
  GET_CURRENT_BY_MONTH: `SELECT sum(mdp.amps) as y, to_char(time, 'yyyy-MM-DD') as x FROM main_device_params as MDP INNER JOIN core_device AS CD on MDP.fk_core_device = CD.pk_core_device WHERE pk_core_device = $1 AND extract(year from time) = $2 AND extract(month from time) = $3 GROUP BY x ORDER BY x;`,

  /**
   * 
   */
  GET_POWER_BY_MONTH: `SELECT sum(mdp.watts) as y, to_char(time, 'yyyy-MM-DD') as x FROM main_device_params as MDP INNER JOIN core_device AS CD on MDP.fk_core_device = CD.pk_core_device WHERE pk_core_device = $1 AND extract(year from time) = $2 AND extract(month from time) = $3 GROUP BY x ORDER BY x;`,

  /**
   * 
   */
  GET_ALL_CURRENT_BY_MONTH: `SELECT cd.pk_core_device as id, cd.name, sum(mdp.amps) as y, to_char(time, 'yyyy-MM-DD') as x FROM main_device_params as MDP INNER JOIN core_device AS CD on MDP.fk_core_device = CD.pk_core_device INNER JOIN core_license CL on CD.fk_core_license = CL.pk_core_license WHERE pk_core_license = $1 AND extract(year from time) = $2 AND extract(month from time) = $3 GROUP BY x, cd.pk_core_device ORDER BY x;`,

  /**
   * 
   */
  GET_ALL_POWER_BY_MONTH: `SELECT cd.pk_core_device as id, cd.name, sum(mdp.watts) as y, to_char(time, 'yyyy-MM-DD') as x FROM main_device_params as MDP INNER JOIN core_device AS CD on MDP.fk_core_device = CD.pk_core_device INNER JOIN core_license CL on CD.fk_core_license = CL.pk_core_license WHERE pk_core_license = $1 AND extract(year from time) = $2 AND extract(month from time) = $3 GROUP BY x, cd.pk_core_device ORDER BY x;`,
}