-- Anado la columna
ALTER TABLE core_device ADD COLUMN fk_core_level ids 

-- Creo el indice
create  index fk_device_ref_level_fk on core_device (
 fk_core_level
);

-- Creo el contraint
ALTER TABLE core_device
 ADD CONTRAINT FK_CORE_DEV_DK_DEVICE_CORE_LEV FOREIGN KEY (fk_core_level)
 REFERENCES core_level (pk_core_level)
 ON DELETE restrict on update restrict;