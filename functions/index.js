const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.myFunction = functions.firestore
  .document('chats/{message}')
  .onCreate((change, context) => {
    return admin.messaging().sendToTopic('chats', {
      notification: {
        title: change.data().username,
        body: change.data().text,
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    });
  });
