import Expo from 'expo-server-sdk';

let expo = new Expo();

export default (tokens, message) => {

  let messages = [];
  for (let pushToken of tokens) {
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    messages.push({
      to: pushToken.token,
      sound: 'default',
      body: pushToken.name + message,
      data: { withSome: pushToken.name + message, },
    })
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}