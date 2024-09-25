const admin = require('firebase-admin');
const serviceAccount = require('./crwndb-f64ec-firebase-adminsdk-kqxxz-df51bf4434.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const registrationToken = '';
const message = {
  notification: {
    title: 'New Notification',
    body: 'Oye, Indrajith!'
  },
  token: registrationToken
};

exports.notification = () =>{

    admin.messaging().send(message)
  .then((response) => {
    console.log('Notification sent:', response);
  })
  .catch((error) => {
    console.error('Error sending notification:', error);
  });

}



