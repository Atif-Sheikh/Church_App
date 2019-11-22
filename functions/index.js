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

exports.parentSignup = functions.https.onRequest((req,res)=>{
    var req=req.body
    console.log("requesting function")
    if(req){
        return admin.auth().createUser({
            email:req.email,
            password:req.password,
            displayName:req.username
        }).then((response)=>{
            let obj={
                Uid:response.uid,
                accountType:req.accountType,
                email:req.email,
                number:req.number,
                userName:req.username
            }
            return admin.database().ref(`users/${response.uid}`).set(obj).then(()=>{
                res.send({success:true})
            }).catch(error=>{
                res.send({success:false,errorMessage:error.message})
            })
        }).catch((error)=>{
            res.send({success:false,errorMessage:error.message})
        })
    }
})
