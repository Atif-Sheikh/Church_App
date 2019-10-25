export default class AuthAction {

    static SIGNIN = 'SIGNIN';
    static SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
    static SIGNIN_FAIL = "SIGNIN_FAIL";
    
    static SIGNUP = "SIGNUP";
    static SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
    static SIGNUP_FAIL = "SIGNUP_FAIL";

    static LOGOUT = 'LOGOUT';
    static LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
    static LOGOUT_FAILED = 'LOGOUT_FAILED';

    static CHECK_USER = 'CHECK_USER';
    static CHECK_USER_SUCCESS = 'CHECK_USER_SUCCESS';
    static CHECK_USER_FAILED = 'CHECK_USER_FAILED';

    static signin(payload) {
        console.log(payload);
        return {
            type: AuthAction.SIGNIN,
            payload
        };
    }
    static signup(payload) {
        console.log(payload, ">>>>>>>>>")
        return {
            type: AuthAction.SIGNUP,
            payload
        }
    }
    static Logout(){
        return {
            type: AuthAction.LOGOUT
        }
    }

    static CheckUser(){
        return {
            type: AuthAction.CHECK_USER,
        }
    }
}