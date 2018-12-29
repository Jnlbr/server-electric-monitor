import db from '../config/db';
import signToken from '../util/signToken';
import {
  UserDAO,
  LicenseDAO,
  DeviceDAO,
  UserPreferenceDAO
} from '../daos';

function userRegister(userId,code) {
  return db.task(async t => {
    const user = new UserDAO(t);

    let _user = await user.select({
      column: 'fk_core_license',
      alias: 'licenseId',
      userId: userId,
    });
    if (!_user.licenseId) {
      const license = new LicenseDAO(t);

      let _license = await license.select(code);
      if (_license) {
        const deviceDAO = new DeviceDAO(t);

        let devices = await deviceDAO.find(
          'fk_core_license',
          _license.id,
          ['pk_core_device'],
        );
        try {
          let preferences = await createPreference([userId], devices.map(d => d.pkcoredevice)); // ids;
          console.log(preferences)
          await user.update({
            column: 'fk_core_license',
            value: _license.id,
            userId: userId,
          });
          const token = signToken({ userId, licenseId: _license.id });
          return {
            status: 200,
            body: {
              hasLicense: true,
              message: 'License successfully linked',
              token
            }
          }
        } catch(err) {
          throw err;
        }
      } else {
        return {
          status: 409,
          body: {
            hasLicense: false,
            message: 'Invalid license'
          }
        }
      }
    } else {
      return {
        status: 409,
        body: {
          hasLicense: true,
          message: 'The user already has a license'
        }
      }
    }
  })
}

function deviceRegister(licenseId, { type, name, voltage }) {
  return db.task(async t => {
    const license = new LicenseDAO(t);

      const device = new DeviceDAO(t);
      const userDAO = new UserDAO(t);
      
      let _device = await device.create(type, licenseId, name, voltage);
      let users = await userDAO.find(
        'fk_core_license',
        licenseId,
        ['pk_core_app_user'],
      );
      
      try {
        let preferences = await createPreference(users.map(u => u.pkcoreappuser), [_device.id]);
        console.log(preferences)
        return {
          status: 200,
          body: {
            ..._device,
            message: 'Success',
          }
        }
      } catch(err) {
        // Retornar el id del device, y hacer un task, unica y exclusivamente para crear las pref
        throw err;
      }
  })
}

function tokenRegister(userId,token) {
  return db.task(async t => {
    const userDAO = new UserDAO(t);

    try {
      await userDAO.update({
        column: 'notification_token',
        value: token,
        userId: userId
      });
      return {
        status: 200,
        body: {
          message: 'Token updated'
        }
      }
    } catch(err) {
      throw err;
    }
  })
}

export default {
  userRegister,
  deviceRegister,
  tokenRegister,
}

function createPreference(users, devices) {
  return db.tx(async t => {
    const userPreferenceDAO = new UserPreferenceDAO(t);
    let queries = [];

    for(let i = 0; i < users.length; i++) {
      for (let j = 0; j < devices.length; j++) {
        queries.push(userPreferenceDAO.create(users[i], devices[j]));
      }
    }
    return await t.batch(queries);
  });
}