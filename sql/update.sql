ALTER TABLE public.main_device_params ADD amps int NULL;
ALTER TABLE public.main_device_params ADD voltage int NULL;
ALTER TABLE public.main_device_params ADD watts int NULL;
ALTER TABLE public.main_device_params ADD time timestamp NOT NULL;

CREATE UNIQUE INDEX core_license_code_uindex ON public.core_license (code);
CREATE UNIQUE INDEX main_notification_type_name_uindex ON public.main_notification_type (name);