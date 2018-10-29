SELECT Mnt.name, Mnp.status, Mnp.pk_main_not_pref AS id FROM main_device_preference AS Mdp
INNER JOIN main_notification_preference Mnp on Mdp.pk_main_device_pref = Mnp.fk_main_device_pref
INNER JOIN main_device_notification Mdn on Mnp.fk_main_device_not = Mdn.pk_main_device_not
INNER JOIN main_notification_type Mnt on Mdn.fk_main_not_type = Mnt.pk_main_not_type
WHERE Mdp.fk_core_app_user = $1 AND Mdp.fk_core_device = $2;