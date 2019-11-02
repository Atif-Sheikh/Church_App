import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

// https://xgrommx.github.io/rx-book/content/rxjs_bindings/dom/index.html#rxdomrequestgetjsonurl
// https://github.com/ReactiveX/rxjs/blob/master/src/observable/dom/AjaxObservable.ts
import { store } from '../store/index'
import { AuthAction } from '../store/actions';
import { Actions } from 'react-native-router-flux';
import 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';


export default class FirebaseService {

    static getToken(){
        return messaging().getToken()
    }
    static listenUserData(){
        database().ref(`/users/${auth().currentUser.uid}`).on("value",(snap)=>{
            store.dispatch({type:AuthAction.NEW_USER_DATA,payload:snap.val()})
        })
    }
    static getUser(){
        return auth().onAuthStateChanged((user) => {
            console.log(user, "ye dekhhhhhhhhhhhhhhhhhhhhhhhhh")
            if(user){
                database().ref(`/users/${user.uid}`).once('value', snapshot => {
                    console.log(snapshot.val(), "YEEEEEEEEEEEeeees");
                    store.dispatch({ type: AuthAction.CHECK_USER_SUCCESS, payload: snapshot.val() })
                }).then(() => {
                    
                })
            } else {
                store.dispatch({ type: AuthAction.CHECK_USER_FAILED })
            }
        });
    }
    static signin(email, password) {
        return auth().signInWithEmailAndPassword(email, password)
    }
    static signup(email, password) {
        return auth().createUserWithEmailAndPassword(email, password)
    }
    static updateProfile(payload) {
        return auth().currentUser.updateProfile(payload)
    }
    static setOnDatabase(ref, payload) {
        return new Promise((res, rej) => {
            return database().ref(ref).set(payload, (() => {
                res();
            }));
        })
    }
    static pushOnDatabase(ref, payload) {
        return database().ref(ref).push(payload)
    }
    static getOnceFromDatabase(ref) {
        console.log(ref, "REF")
        return new Promise((res, rej) => {
            return database().ref(ref).once("value", (snapshot) => {
                console.log(snapshot.val(), ">Ye rha");
                res(snapshot.val());
            })
        })
    }
    static updateOnDatabase(ref, payload) {
        return database().ref(ref).update(payload)
    }
    static removeFromDatabase(ref) {
        return database().ref(ref).remove();
    }
    static listenOnDatabase(ref) {
        return database().ref(ref).once("value", (snapshot) => snapshot.val())
    }
    static logoutuser() {
        return auth().signOut()
    }

    static uploadPhoto(uri) {
        if (uri) {
            return new Promise((res, rej) => {
               try {
                   let formdata = new FormData();
                   formdata.append('file', uri);
                   formdata.append('cloud_name', 'atif786');
                   formdata.append('upload_preset', 'e7bxdahf');
                   formdata.append('api_key', '628766992677356');
           
                   var xhr = new XMLHttpRequest();
                   xhr.open('POST', "https://api.cloudinary.com/v1_1/cloud_name/image/upload", true);
           
                   xhr.onload = function () {
                       // do something to response
                       if (xhr.status === 200) {
                           var url = JSON.parse(xhr.responseText);
                           res(url.url);
                       }
                   }.bind(this);
                   xhr.send(formdata);
               } catch(err) {
                   console.log(err, "UPLOAD IMAGE ERR")
               }
    
    
                // const storage = firebase.storage();
                // const sessionId = new Date().getTime();
                // const imageRef = storage.ref(`images/${sessionId}`);
                // return imageRef.putFile(uri).then(() => {
                //     return imageRef.getDownloadURL()
    
                // })
            
            });
        }
    }
}