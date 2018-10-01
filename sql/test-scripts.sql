-- DML
-- inserts
INSERT INTO core_level (fk_core_license, order_number, name, fk_core_level) VALUES (1,1,'room 1', null)
INSERT INTO core_level (name, order_number, fk_core_license, fk_core_level) VALUES ('room 1',4,1,2)
-- updates
UPDATE core_app_user set fk_core_license = 1 WHERE core_app_user.username = 'jnlbr'
UPDATE core_device_type SET name = 'CURRENT_SENSOR' WHERE pk_core_device_type = 1
-- DLL
SELECT * FROM core_app_user
SELECT core_license.pk_core_license as id, core_license.code, core_license.status FROM core_license
SELECT * FROM core_level WHERE fk_core_license = 1
SELECT * FROM core_level WHERE fk_core_license = 1 AND fk_core_level is null ORDER BY order_number DESC LIMIT 1
SELECT * from core_license inner join core_app_user ON core_app_user.fk_core_license = core_license.pk_core_license