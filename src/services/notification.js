import db from '../config/db';
import { UserDAO } from '../daos';
import sendExpoNotification from "../util/expo";

async function sendMessage(licenseId, message) {
  const userDAO = new UserDAO(db);

  try {
    let tokens = await userDAO.getTokens(licenseId);
    console.log('USER TOKENS: ');
    tokens = tokens.map(t => t.token);
    console.log(tokens);
    sendExpoNotification(tokens, message);
  } catch(err) {
    throw err;
  }
}

export default {
  sendMessage
}