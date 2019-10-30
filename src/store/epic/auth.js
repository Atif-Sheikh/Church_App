import { Observable } from 'rxjs/Observable';
import { AuthAction } from '../actions/index';
import FirebaseService from '../../firebaseService/firebaseService'
import { firebase } from '@react-native-firebase/database';
import { Actions } from 'react-native-router-flux';

import 'rxjs/operators/map';

import 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { map } from 'rxjs/operators/map';

export default class Epic {
    static SigninEpic = (action$) => {
        return action$.ofType(AuthAction.SIGNIN)
            .switchMap(({ payload }) => {
                console.log(payload)
                return Observable.fromPromise(
                    FirebaseService.signin(payload.email, payload.password)
                ).switchMap(({ user }) => {
                    return Observable.fromPromise(
                        FirebaseService.getToken()
                    ).switchMap((token) => {
                        return Observable.fromPromise(
                            FirebaseService.updateOnDatabase(`/users/${user.uid}`, { deviceToken: token })
                        ).switchMap(() => {
                            return Observable.fromPromise(
                                FirebaseService.getOnceFromDatabase(`/users/${user.uid}`)
                            ).switchMap((data) => {
                                    // alert(data._value);
                                console.log(data, "yed khoo")
                                return Observable.of({
                                    type: AuthAction.SIGNIN_SUCCESS,
                                    payload: data._value
                                })
                            })
                            
                        }).catch((err) => {
                            alert(err)
                            console.log(err, "Err")
                            return Observable.of({
                                type: AuthAction.SIGNIN_FAIL,
                                payload: err
                            })
                        })
                    })
                }).catch((err) => {
                    alert(err)

                    return Observable.of({
                        type: AuthAction.SIGNIN_FAIL,
                        payload: err
                    })
                })
            }).catch((error) => {
                alert(error)

                return Observable.of({
                    type: AuthAction.SIGNIN_FAIL,
                    payload: error
                })
            })
    };
    static SignupEpic = (action$) => {
        console.log("ye chala")
        return action$.ofType(AuthAction.SIGNUP)
            .switchMap(({ payload }) => {
                console.log(payload, "ye bh chala")
                return Observable.fromPromise(
                    FirebaseService.signup(payload.email, payload.password)
                ).switchMap(({ user }) => {
                    console.log(user, "ye")
                    return Observable.fromPromise(
                        FirebaseService.getToken()
                    ).switchMap((token) => {
                        // user.sendEmailVerification();
                        return Observable.fromPromise(
                            FirebaseService.updateProfile({ displayName: payload.userName })
                        ).switchMap(() => {
                            let password = payload['password'];
                            payload.deviceToken = token;
                            payload.Uid = user.uid;
                            delete payload['password'];
                            return Observable.fromPromise(
                                FirebaseService.setOnDatabase(`users/${user.uid}/`, payload)
                            ).switchMap(() => {
                                Actions.home();
                                return Observable.of({
                                    type: AuthAction.SIGNUP_SUCCESS,
                                    payload
                                })
                            })
                        })
                    })
                    // console.log(user)
                    //     firebase.auth().currentUser.updateProfile({
                    //         displayName:payload.userName
                    //     })

                }).catch((err) => {
                    console.warn(err)
                    return Observable.of({
                        type: AuthAction.SIGNUP_FAIL,
                        payload: err
                    })
                })
            }).catch((error) => {
                alert(error)
                return Observable.of({
                    type: AuthAction.SIGNUP_FAIL,
                    payload: error
                })
            })

    }
    static Logout = (action$) => {
        return action$.ofType(AuthAction.LOGOUT)
            .switchMap(() => {
                return Observable.fromPromise(
                    FirebaseService.updateOnDatabase(`users/${firebase.auth().currentUser.uid}/`, { online: false })
                ).switchMap(() => {
                    return Observable.fromPromise(
                        FirebaseService.logoutuser()
                    ).map(() => {
                        Actions.popAndPush('login');
                        return {
                            type: AuthAction.LOGOUT_SUCCESS
                        }
                    })
                }).catch((err) => {
                    alert(err)
                    return {
                        type: AuthAction.LOGOUT_FAILED,
                    }
                })
            }).catch((err) => {
                alert(err)
                return {
                    type: AuthAction.LOGOUT_FAILED,
                    // payload: err
                }
            })
    };

    static CheckUser = (action$) => {
        return action$.ofType(AuthAction.CHECK_USER)
            .switchMap(() => {
                FirebaseService.getUser();
                return Observable.of({
                    type: ""
                })
            }).catch((err) => {
                alert(err);
                return {
                    type: AuthAction.CHECK_USER_FAILED,
                }
            })
    };

};