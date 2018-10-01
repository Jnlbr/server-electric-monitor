-- TRIGGER
CREATE trigger create_user_preference
  AFTER INSERT 
  ON main_device_preference
  FOR EACH ROW
  EXECUTE PROCEDURE user_register();

-- VERSION 0.01;
CREATE OR REPLACE FUNCTION user_register()
RETURNS trigger AS
$BODY$
 DECLARE
  id_pref integer;
  devices core_device;
 BEGIN
  id_pref := NEW.pk_main_device_pref;
  FOR devices IN
   SELECT * FROM core_device WHERE core_device.pk_core_device = NEW.fk_core_device
   LOOP
   	INSERT INTO test(col1,col2) values(devices.fk_core_device_type, id_pref);
   END LOOP;
  RETURN NEW;
 END;
$BODY$
LANGUAGE PLpgSQL;

-- VERSION 0.02;
CREATE OR REPLACE FUNCTION user_register()
RETURNS trigger AS
$BODY$
  DECLARE
    id_pref integer;
    devices core_device;
    device_notifications main_device_notification;
  BEGIN
    id_pref := NEW.pk_main_device_pref;
    FOR devices IN SELECT * FROM core_device WHERE core_device.pk_core_device = NEW.fk_core_device
    LOOP
      FOR device_notifications IN 
      SELECT * FROM main_device_notification WHERE main_device_notification.fk_core_device_type = devices.fk_core_device_type
      LOOP

      END LOOP;
    END LOOP;
    RETURN NEW;
  END;
$BODY$
LANGUAGE PLpgSQL;

-- VERSION 0.03;
CREATE OR REPLACE FUNCTION user_register()
RETURNS trigger AS
$BODY$
  DECLARE
    id_pref integer;
    device core_device%ROWTYPE;
    device_notifications main_device_notification;
  BEGIN
    id_pref := NEW.pk_main_device_pref;
    SELECT * INTO device FROM core_device WHERE core_device.pk_core_device = NEW.fk_core_device;
    INSERT INTO test(col1,col2) values(device.fk_core_device_type, id_pref);
    RETURN NEW;
  END;
$BODY$
LANGUAGE PLpgSQL;

-- VERSION 0.04;
CREATE OR REPLACE FUNCTION user_register()
RETURNS trigger AS
$BODY$
  DECLARE
    id_pref integer;
    device core_device%ROWTYPE;
    device_notifications main_device_notification;
  BEGIN
    id_pref := NEW.pk_main_device_pref;
    SELECT * INTO device FROM core_device WHERE core_device.pk_core_device = NEW.fk_core_device;
    FOR device_notifications IN
      SELECT * FROM main_device_notification WHERE main_device_notification.fk_core_device_type = device.fk_core_device_type
      LOOP
        INSERT INTO test(col1,col2) values(device_notifications.pk_main_device_not, id_pref);
      END LOOP;
    RETURN NEW;
  END;
$BODY$
LANGUAGE PLpgSQL;

-- VERSION 0.05
CREATE OR REPLACE FUNCTION user_register()
RETURNS trigger AS
$BODY$
  DECLARE
    id_pref integer;
    id_device integer;
    device core_device%ROWTYPE;
    device_notifications main_device_notification;
  BEGIN
    id_pref := NEW.pk_main_device_pref;
    id_device := NEW.fk_core_device;
    SELECT * INTO device FROM core_device WHERE core_device.pk_core_device = id_device;
    FOR device_notifications IN
      SELECT pk_main_device_not FROM main_device_notification WHERE main_device_notification.fk_core_device_type = device.fk_core_device_type
      LOOP
        INSERT INTO main_notification_preference(fk_main_device_pref,fk_main_device_not,status) 
        VALUES (id_pref, device_notifications.pk_main_device_not, true);
      END LOOP;
    RETURN NEW;
  END;
$BODY$
LANGUAGE PLpgSQL;