const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

function loadUsers() {
    let dbRef = admin.database().ref('/users');
    let defer = new Promise((resolve, reject) => {
        dbRef.once('value', (snap) => {
            resolve(data);
        }, (err) => {
            reject(err);
        });
    });
    return defer;
};

exports.sendPushNotification = functions.database.ref("/status/{listId}")
  .onCreate(event => {
    console.log('event', event);
    return loadUsers().then(users => {
        let tokens = [];
        for (let key in users) {
            if(users[key]['deviceToken']){
                tokens.push(users[key]['deviceToken']);
            }
        }
        let payload = {
            data: {
                priority: 'high'
            },
                notification: {
                title: 'New Notification',
                body: 'New Post in Church App',
                sound: 'default',
            }
        };
        return admin.messaging().sendToDevice(tokens, payload);
    });
});

exports.chatNotification = functions.https.onRequest((req, res) => {
    res.send('success');
    console.log('sucesss');
        if(req.body.deviceToken){
            let payload = {
                data: {
                    priority: 'high'
                },
                notification: {
                    title: `New Message from ${req.body.name}`,
                    body: req.body.message,
                    sound: 'default',
                }
            };
            console.log(req.body.deviceToken)
            return admin.messaging().sendToDevice(req.body.deviceToken, payload);
        }
});

