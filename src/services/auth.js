import db from '../config/db';
import { UserDAO } from '../daos';

async function userData(id) {
  const userDAO = new UserDAO(db);

  try {    
    let user = await userDAO.find('pk_core_app_user', id, ['email', 'fk_core_license', 'username', 'name']);
    user = user[0];
    let hasLicense = user.fkcorelicense ? true : false;  
    delete user['fkcorelicense'];
    return {
      hasLicense,
      ...user
    };
  } catch(err) {
    throw err;
  }
}

async function signUp() {
  
}

export default {
  userData,
  signUp
}