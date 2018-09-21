import Expo from 'expo-server-sdk';

const token = req.body.token.value;

export default () => {
  if (Expo.isExpoPushToken(token)) {
    const messages = [{
      to: token,
      sound: 'default',
      body: 'testing',
      data: { withSome: 'data' }
    }]
    let chunks = expo.chunkPushNotifications(messages);
    chunks.forEach(async chunk => {
      try {
        let ticket = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticket);
      } catch (err) {
        console.log(err);
      }
    });
  }
}
// const message = {
  //   data: {
  //     score: '850',
  //     time: '2:45'
  //   },
  //   topic: 's',
  //   condition:'s',
  //   token: req.body.token,
  // };
  // fb.messaging().send(message)
  // .then(res => {
  //   console.log(res);
  // })
  // .catch(err => {
  //   console.log('ERROR IN FB MESSAGING!');
  //   console.log(err.message || err);
  // })