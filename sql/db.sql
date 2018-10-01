/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     22/9/2018 14:13:38                           */
/*==============================================================*/

create sequence core_app_user_seq
minvalue 1
increment 1
start 1;

create sequence core_device_seq
minvalue 1
increment 1
start 1;

create sequence core_device_type_seq
minvalue 1
increment 1
start 1;

create sequence core_level_seq
minvalue 1
increment 1
start 1;

create sequence core_license_seq
minvalue 1
increment 1
start 1;

create sequence main_device_current_seq
minvalue 1
increment 1
start 1;

create sequence main_device_notification_seq
minvalue 1
increment 1
start 1;

create sequence main_device_preference_seq
minvalue 1
increment 1
start 1;

create sequence main_notification_preference_seq
minvalue 1
increment 1
start 1;

create sequence main_notification_type_seq
minvalue 1
increment 1
start 1;

/*==============================================================*/
/* Domain: basic_status                                         */
/*==============================================================*/
create domain basic_status as BOOL;

/*==============================================================*/
/* Domain: codes                                                */
/*==============================================================*/
create domain codes as VARCHAR(64);

/*==============================================================*/
/* Domain: dates                                                */
/*==============================================================*/
create domain dates as DATE;

/*==============================================================*/
/* Domain: ids                                                  */
/*==============================================================*/
create domain ids as INT4;

/*==============================================================*/
/* Domain: "int"                                                */
/*==============================================================*/
create domain "int" as INT4;

/*==============================================================*/
/* Domain: ips                                                  */
/*==============================================================*/
create domain ips as VARCHAR(128);

/*==============================================================*/
/* Domain: long_string                                          */
/*==============================================================*/
create domain long_string as VARCHAR(64);

/*==============================================================*/
/* Domain: medium_string                                        */
/*==============================================================*/
create domain medium_string as VARCHAR(32);

/*==============================================================*/
/* Domain: short_string                                         */
/*==============================================================*/
create domain short_string as VARCHAR(16);

/*==============================================================*/
/* Domain: "timestamp"                                          */
/*==============================================================*/
create domain "timestamp" as DATE;

/*==============================================================*/
/* Domain: very_long_string                                     */
/*==============================================================*/
create domain very_long_string as VARCHAR(128);

/*==============================================================*/
/* Table: core_app_user                                         */
/*==============================================================*/
create table core_app_user (
   pk_core_app_user     ids                  not null default nextval('core_app_user_seq'),
   fk_core_license      ids                  null,
   username             medium_string        not null,
   email                long_string          not null,
   password             very_long_string     not null,
   firstname            short_string         not null,
   lastname             short_string         not null,
   constraint PK_CORE_APP_USER primary key (pk_core_app_user)
);

comment on table core_app_user is
'Table that contains the users account of a settlement';

comment on column core_app_user.pk_core_app_user is
'User primary identifier';

comment on column core_app_user.fk_core_license is
'License primary identifier';

/*==============================================================*/
/* Index: core_app_user_pk                                      */
/*==============================================================*/
create unique index core_app_user_pk on core_app_user (
pk_core_app_user
);

/*==============================================================*/
/* Index: fk_user_license_ref_license_fk                        */
/*==============================================================*/
create  index fk_user_license_ref_license_fk on core_app_user (
fk_core_license
);

/*==============================================================*/
/* Table: core_device                                           */
/*==============================================================*/
create table core_device (
   pk_core_device       ids                  not null default nextval('core_device_seq'),
   fk_core_device_type  ids                  not null,
   fk_core_level        ids,
   fk_core_license      ids                  not null,
   name                 medium_string        not null,
   ip                   ips                  not null,
   status               basic_status         not null,
   constraint PK_CORE_DEVICE primary key (pk_core_device)
);

comment on table core_device is
'Table that contains the devices of a settlement';

comment on column core_device.pk_core_device is
'Device primary identifier';

comment on column core_device.fk_core_device_type is
'Device type primary identifier';

comment on column core_device.fk_core_level is
'Level primary identifier';

comment on column core_device.fk_core_license is
'License primary identifier';

/*==============================================================*/
/* Index: core_device_pk                                        */
/*==============================================================*/
create unique index core_device_pk on core_device (
pk_core_device
);

/*==============================================================*/
/* Index: fk_device_ref_device_type_fk                          */
/*==============================================================*/
create  index fk_device_ref_device_type_fk on core_device (
fk_core_device_type
);

/*==============================================================*/
/* Index: fk_device_ref_license_fk                              */
/*==============================================================*/
create  index fk_device_ref_license_fk on core_device (
fk_core_license
);

/*==============================================================*/
/* Index: dk_device_ref_level_fk                                */
/*==============================================================*/
create  index dk_device_ref_level_fk on core_device (
fk_core_level
);

/*==============================================================*/
/* Table: core_device_type                                      */
/*==============================================================*/
create table core_device_type (
   pk_core_device_type  ids                  not null default nextval('core_device_type_seq'),
   name                 medium_string        not null,
   constraint PK_CORE_DEVICE_TYPE primary key (pk_core_device_type)
);

comment on table core_device_type is
'Device type catalog';

comment on column core_device_type.pk_core_device_type is
'Device type primary identifier';

/*==============================================================*/
/* Index: core_device_type_pk                                   */
/*==============================================================*/
create unique index core_device_type_pk on core_device_type (
pk_core_device_type
);

/*==============================================================*/
/* Table: core_level                                            */
/*==============================================================*/
create table core_level (
   pk_core_level        ids                  not null default nextval('core_level_seq'),
   fk_core_license      ids                  not null,
   fk_core_level        ids                  null,
   name                 medium_string        not null,
   "order"              "int"                not null,
   constraint PK_CORE_LEVEL primary key (pk_core_level)
);

comment on table core_level is
'Table that contains the levels of a settlement';

comment on column core_level.pk_core_level is
'Level primary identifier';

comment on column core_level.fk_core_license is
'License primary identifier';

comment on column core_level.fk_core_level is
'Level primary identifier';

/*==============================================================*/
/* Index: core_level_pk                                         */
/*==============================================================*/
create unique index core_level_pk on core_level (
pk_core_level
);

/*==============================================================*/
/* Index: fk_level_ref_level_fk                                 */
/*==============================================================*/
create  index fk_level_ref_level_fk on core_level (
fk_core_level
);

/*==============================================================*/
/* Index: fk_level_ref_license_fk                               */
/*==============================================================*/
create  index fk_level_ref_license_fk on core_level (
fk_core_license
);

/*==============================================================*/
/* Table: core_license                                          */
/*==============================================================*/
create table core_license (
   pk_core_license      ids                  not null default nextval('core_license_seq'),
   code                 codes                not null,
   issue_date           dates                not null,
   expires_date         dates                not null,
   status               basic_status         null,
   constraint PK_CORE_LICENSE primary key (pk_core_license)
);

comment on table core_license is
'License catalog';

comment on column core_license.pk_core_license is
'License primary identifier';

/*==============================================================*/
/* Index: core_license_pk                                       */
/*==============================================================*/
create unique index core_license_pk on core_license (
pk_core_license
);

/*==============================================================*/
/* Table: main_device_current                                   */
/*==============================================================*/
create table main_device_current (
   pk_main_device_current ids                  not null default nextval('main_device_current_seq'),
   fk_core_device       ids                  not null,
   value                "int"                not null,
   "time"               "timestamp"          not null,
   constraint PK_MAIN_DEVICE_CURRENT primary key (pk_main_device_current)
);

comment on column main_device_current.fk_core_device is
'Device primary identifier';

/*==============================================================*/
/* Index: main_device_current_pk                                */
/*==============================================================*/
create unique index main_device_current_pk on main_device_current (
pk_main_device_current
);

/*==============================================================*/
/* Index: fk_device_current_ref_device_fk                       */
/*==============================================================*/
create  index fk_device_current_ref_device_fk on main_device_current (
fk_core_device
);

/*==============================================================*/
/* Table: main_device_notification                              */
/*==============================================================*/
create table main_device_notification (
   pk_main_device_type_not ids                  not null default nextval('main_device_notification_seq'),
   fk_core_device_type  ids                  null,
   fk_main_not_type     ids                  not null,
   constraint PK_MAIN_DEVICE_NOTIFICATION primary key (pk_main_device_type_not)
);

comment on table main_device_notification is
'A type of device has one or many type of notifications';

comment on column main_device_notification.fk_core_device_type is
'Device type primary identifier';

comment on column main_device_notification.fk_main_not_type is
'Notification primary identifier';

/*==============================================================*/
/* Index: main_device_notification_pk                           */
/*==============================================================*/
create unique index main_device_notification_pk on main_device_notification (
pk_main_device_type_not
);

/*==============================================================*/
/* Index: fk_device_not_ref_not_fk                              */
/*==============================================================*/
create  index fk_device_not_ref_not_fk on main_device_notification (
fk_main_not_type
);

/*==============================================================*/
/* Index: fk_device_not_ref_device_type                         */
/*==============================================================*/
create  index fk_device_not_ref_device_type on main_device_notification (
fk_core_device_type
);

/*==============================================================*/
/* Table: main_device_preference                                */
/*==============================================================*/
create table main_device_preference (
   pk_main_device_pref  ids                  not null default nextval('main_device_preference_seq'),
   fk_core_app_user     ids                  not null,
   fk_core_device       ids                  not null,
   constraint PK_MAIN_DEVICE_PREFERENCE primary key (pk_main_device_pref)
);

comment on table main_device_preference is
'Table that contains the users preferences for an specific device';

comment on column main_device_preference.fk_core_app_user is
'User primary identifier';

comment on column main_device_preference.fk_core_device is
'Device primary identifier';

/*==============================================================*/
/* Index: core_device_preference_pk                             */
/*==============================================================*/
create unique index core_device_preference_pk on main_device_preference (
pk_main_device_pref
);

/*==============================================================*/
/* Index: fk_device_pref_ref_app_user                           */
/*==============================================================*/
create  index fk_device_pref_ref_app_user on main_device_preference (
fk_core_app_user
);

/*==============================================================*/
/* Index: fk_device_preference_ref_device                       */
/*==============================================================*/
create  index fk_device_preference_ref_device on main_device_preference (
fk_core_device
);

/*==============================================================*/
/* Table: main_notification_prefence                            */
/*==============================================================*/
create table main_notification_prefence (
   pk_main_not_pref     ids                  not null default nextval('main_notification_preference_seq'),
   fk_main_device_type_not ids                  not null,
   fk_core_device_config ids                  not null,
   status               basic_status         not null,
   constraint PK_MAIN_NOTIFICATION_PREFENCE primary key (pk_main_not_pref)
);

/*==============================================================*/
/* Index: main_notification_prefence_pk                         */
/*==============================================================*/
create unique index main_notification_prefence_pk on main_notification_prefence (
pk_main_not_pref
);

/*==============================================================*/
/* Index: fk_not_pref_ref_device_not                            */
/*==============================================================*/
create  index fk_not_pref_ref_device_not on main_notification_prefence (
fk_main_device_type_not
);

/*==============================================================*/
/* Index: fk_not_pref_ref_device_pref                           */
/*==============================================================*/
create  index fk_not_pref_ref_device_pref on main_notification_prefence (
fk_core_device_config
);

/*==============================================================*/
/* Table: main_notification_type                                */
/*==============================================================*/
create table main_notification_type (
   pk_main_not_type     ids                  not null default nextval('main_notification_type_seq'),
   name                 medium_string        not null,
   code                 codes                not null,
   constraint PK_MAIN_NOTIFICATION_TYPE primary key (pk_main_not_type)
);

comment on table main_notification_type is
'Notification type catalog';

comment on column main_notification_type.pk_main_not_type is
'Notification primary identifier';

/*==============================================================*/
/* Index: main_notification_type_pk                             */
/*==============================================================*/
create unique index main_notification_type_pk on main_notification_type (
pk_main_not_type
);

alter table core_app_user
   add constraint FK_CORE_APP_FK_USER_L_CORE_LIC foreign key (fk_core_license)
      references core_license (pk_core_license)
      on delete restrict on update restrict;

alter table core_device
   add constraint FK_CORE_DEV_DK_DEVICE_CORE_LEV foreign key (fk_core_level)
      references core_level (pk_core_level)
      on delete restrict on update restrict;

alter table core_device
   add constraint FK_CORE_DEV_FK_DEVICE_CORE_DEV foreign key (fk_core_device_type)
      references core_device_type (pk_core_device_type)
      on delete restrict on update restrict;

alter table core_device
   add constraint FK_CORE_DEV_FK_DEVICE_CORE_LIC foreign key (fk_core_license)
      references core_license (pk_core_license)
      on delete restrict on update restrict;

alter table core_level
   add constraint FK_CORE_LEV_FK_LEVEL__CORE_LEV foreign key (fk_core_level)
      references core_level (pk_core_level)
      on delete restrict on update restrict;

alter table core_level
   add constraint FK_CORE_LEV_FK_LEVEL__CORE_LIC foreign key (fk_core_license)
      references core_license (pk_core_license)
      on delete restrict on update restrict;

alter table main_device_current
   add constraint FK_MAIN_DEV_FK_DEVICE_CORE_DEV foreign key (fk_core_device)
      references core_device (pk_core_device)
      on delete restrict on update restrict;

alter table main_device_notification
   add constraint FK_MAIN_DEV_FK_DEVICE_CORE_DEV foreign key (fk_core_device_type)
      references core_device_type (pk_core_device_type)
      on delete restrict on update restrict;

alter table main_device_notification
   add constraint FK_MAIN_DEV_FK_DEVICE_MAIN_NOT foreign key (fk_main_not_type)
      references main_notification_type (pk_main_not_type)
      on delete restrict on update restrict;

alter table main_device_preference
   add constraint FK_MAIN_DEV_FK_DEVICE_CORE_APP foreign key (fk_core_app_user)
      references core_app_user (pk_core_app_user)
      on delete restrict on update restrict;

alter table main_device_preference
   add constraint FK_MAIN_DEV_FK_DEVICE_CORE_DEV foreign key (fk_core_device)
      references core_device (pk_core_device)
      on delete restrict on update restrict;

alter table main_notification_prefence
   add constraint FK_MAIN_NOT_FK_NOT_PR_MAIN_DEV foreign key (fk_core_device_config)
      references main_device_preference (pk_main_device_pref)
      on delete restrict on update restrict;

alter table main_notification_prefence
   add constraint FK_MAIN_NOT_FK_PREF_R_MAIN_DEV foreign key (fk_main_device_type_not)
      references main_device_notification (pk_main_device_type_not)
      on delete restrict on update restrict;