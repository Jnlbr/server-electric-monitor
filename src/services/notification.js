import db from '../config/db';
import { UserDAO } from '../daos';
import sendExpoNotification from "../util/expo";

async function sendMessage(licenseId, deviceId, message) {
  const userDAO = new UserDAO(db);

  try {
    let tokens = await userDAO.getTokens(licenseId,deviceId);
    console.log('USER TOKENS: ');
    console.log(tokens);
    sendExpoNotification(tokens, message);
  } catch(err) {
    throw err;
  }
}

export default {
  sendMessage
}