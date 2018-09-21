import * as admin from 'firebase-admin';
import serviceAccount from '../../electric-monitor-firebase-adminsdk.json';

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://electric-monitor.firebaseio.com/'
});

// const app = admin.initializeApp();

export default app;