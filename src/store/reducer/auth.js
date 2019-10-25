import { AuthAction } from '../actions';
const INITIAL_STATE = {
    isAuthenticated: false,
    user: null,
    isError: false,
    update: false,
    updateError: false,
    updateLoader: false,
    errorMessage: null,
    addParentLoading: null,
    addParentSuccess: null,

    logout: null,
    signInLoading: null,
    signupLoader: null,
    loader: false,
    checkUserLoader: null,
    checkUser: null

};
export default function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthAction.CHECK_USER:
            console.log(action.payload);
            return Object.assign({}, state, { checkUserLoader: true, checkUser: null });
        case AuthAction.CHECK_USER_SUCCESS:
            console.log(action.payload);
            return Object.assign({}, state, { checkUserLoader: false, user: action.payload, isAuthenticated: true, checkUser: true });
        case AuthAction.CHECK_USER_FAILED:
            console.log(action.payload);
            return Object.assign({}, state, { checkUserLoader: false, isAuthenticated: false, checkUser: null });

        case AuthAction.SIGNIN:
            return Object.assign({}, state, { isAuthenticated: false, user: null, isError: false, signInLoading: true });
        case AuthAction.SIGNIN_SUCCESS:
            console.log(state.user, action.payload);
            return Object.assign({}, state, { isAuthenticated: true, user: action.payload, signInLoading: false });
        case AuthAction.SIGNIN_FAIL:
            return Object.assign({}, state, { isError: true, signInLoading: false })

        case AuthAction.SIGNUP:
            return Object.assign({}, state, { isAuthenticated: false, user: null, isError: false, signupLoader: true });
        case AuthAction.SIGNUP_SUCCESS:
            return Object.assign({}, state, { isAuthenticated: true, user: action.payload, signupLoader: false });
        case AuthAction.SIGNUP_FAIL:
            return Object.assign({}, state, { isError: true, signupLoader: false })

        case AuthAction.LOGOUT:
            return Object.assign({}, state, { loader: true })
        case AuthAction.LOGOUT_SUCCESS:
            return Object.assign({}, state, { loader: false, logout: null, user: null });
        case AuthAction.LOGOUT_FAILED:
            return Object.assign({}, state, { logout: false, loader: false });

        default:
            return state;
    }
}