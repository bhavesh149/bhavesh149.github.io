import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      projectId: 'portofolio-487c5',
    }),
    databaseURL:
      'https://portofolio-487c5-default-rtdb.firebaseio.com/',
  });
}

export default admin.database();
