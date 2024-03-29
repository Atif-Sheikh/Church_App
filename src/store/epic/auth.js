import { Observable } from 'rxjs/Observable';
import { AuthAction } from '../actions/index';
import FirebaseService from '../../firebaseService/firebaseService'
import auth from '@react-native-firebase/auth';

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
                                return Observable.of({
                                    type: AuthAction.SIGNIN_SUCCESS,
                                    payload: data
                                })
                            })
                            
                        }).catch((err) => {
                            alert(err)
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
        return action$.ofType(AuthAction.SIGNUP)
            .switchMap(({ payload }) => {
                console.log(payload, "ye bh chala")
                return Observable.fromPromise(
                    FirebaseService.signup(payload.email, payload.password)
                ).switchMap(({ user }) => {
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
                                return Observable.of({
                                    type: AuthAction.SIGNUP_SUCCESS,
                                    payload
                                })
                            }).catch(err => {
                                alert(err)
                                return Observable.of({
                                    type: AuthAction.SIGNUP_FAIL,
                                    payload: err
                                })        
                            })
                        }).catch(err => {
                            alert(err)
                            return Observable.of({
                                type: AuthAction.SIGNUP_FAIL,
                                payload: err
                            })        
                        })
                    })
                    // console.log(user)
                    //     firebase.auth().currentUser.updateProfile({
                    //         displayName:payload.userName
                    //     })

                }).catch((err) => {
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
                    FirebaseService.logoutuser()
                ).switchMap(() => {
                    return Observable.of({
                        type: AuthAction.LOGOUT_SUCCESS
                    })
                })
            }).catch((err) => {
                alert(err)
                return Observable.of({
                    type: AuthAction.LOGOUT_FAILED,
                })
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
                return Observable.of({
                    type: AuthAction.CHECK_USER_FAILED,
                })
            })
    };

    static PostData = (action$) => {
        return action$.ofType(AuthAction.POST_DATA)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(
                    FirebaseService.uploadPhoto(payload.photo)
                ).switchMap((uri) => {
                    payload['photo'] = uri;
                    return Observable.fromPromise(
                        FirebaseService.pushOnDatabase(`status`, payload)
                    ).switchMap(() => {
                        return Observable.of({
                            type: AuthAction.POST_DATA_SUCCESS
                        })
                    })
                }).catch((err) => {
                    alert(err)

                })
            }).catch((error) => {
                alert(error)

                return Observable.of({
                    type: AuthAction.POST_DATA_FAIL,
                    payload: error
                })
            })

    }


    static GetPosts = (action$) => {
        return action$.ofType(AuthAction.GET_DATA)
            .switchMap(({ payload }) => {
                return Observable.fromPromise(
                    FirebaseService.listenOnDatabase("status")
                ).switchMap(({_snapshot: { value }}) => {
                    console.log(value, "DAta")
                    return Observable.of({
                        type: AuthAction.GET_DATA_SUCCESS,
                        payload: value
                    })
                })

            }).catch((error) => {
                alert(error)

                return Observable.of({
                    type: AuthAction.GET_DATA_FAIL,
                    payload: error
                })
            })

    }

    static ListenUserData = (action$) => {
        return action$.ofType(AuthAction.LISTEN_USER_DATA)
            .switchMap(() => {
                FirebaseService.listenUserData();
                return Observable.of({
                    type: ""
                })
            }).catch((err) => {
                alert(err);
                return {
                    type: "",
                }
            })
    };

    static SendMessage = (action$) => {
        return action$.ofType(AuthAction.SEND_MESSAGE)
            .switchMap(({ payload }) => {
                let path = payload.path;
                delete payload['path'];
                return Observable.fromPromise(
                    FirebaseService.pushOnDatabase(`chatMessages/${path}`, payload)
                ).switchMap(() => {
                    return Observable.of({
                        type: AuthAction.SEND_MESSAGE_SUCCESS,
                        payload
                    })
                })
            }).catch((err) => {
                alert(err);
                return {
                    type: AuthAction.SEND_MESSAGE_FAILED,
                }
            })
    };


};