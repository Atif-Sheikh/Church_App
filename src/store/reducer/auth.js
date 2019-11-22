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
    checkUserLoader: true,
    checkUser: null,


    postsLoader: false,
    posts: null,
    error: null,


    postSuccess: null,
    PostDataLoader: null,
    postDataErr: null,

    users: null,

    chat: null
};
export default function AuthReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case AuthAction.CHECK_USER:
            
            return Object.assign({}, state, { checkUserLoader: true, checkUser: null });
        case AuthAction.CHECK_USER_SUCCESS:
            
            return Object.assign({}, state, { checkUserLoader: false, user: action.payload, isAuthenticated: true, checkUser: true });
        case AuthAction.CHECK_USER_FAILED:
            
            return Object.assign({}, state, { checkUserLoader: false, isAuthenticated: false, checkUser: null });

        case AuthAction.SIGNIN:
            return Object.assign({}, state, { isAuthenticated: false, isError: false, signInLoading: true });
    
        case AuthAction.SIGNIN_SUCCESS:

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
            return Object.assign({}, state, { loader: true, logout: false })
        case AuthAction.LOGOUT_SUCCESS:
            return Object.assign({}, state, { 
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
                checkUserLoader: true,
                checkUser: null,
            
            
                postsLoader: false,
                posts: null,
                error: null,
            
            
                postSuccess: null,
                PostDataLoader: null,
                postDataErr: null,
            
                users: null,
            
                chat: null
             });
        case AuthAction.LOGOUT_FAILED:
            return Object.assign({}, state, { logout: false, loader: false });



        case AuthAction.GET_DATA:
            return Object.assign({}, state, { postsLoader: true });
        case AuthAction.GET_DATA_SUCCESS:
            return Object.assign({}, state, { posts: action.payload, postsLoader: false });
        case AuthAction.GET_DATA_FAIL:
            return Object.assign({}, state, { error: action.payload, postsLoader: false });

        
        case AuthAction.POST_DATA: 
            return Object.assign({}, state, { postSuccess: null, PostDataLoader: true, postDataErr: null });
        case AuthAction.POST_DATA_SUCCESS: 
            return Object.assign({}, state, { postSuccess: true, PostDataLoader: false, postDataErr: null });
        case AuthAction.POST_DATA_FAIL: 
            return Object.assign({}, state, { postSuccess: false, PostDataLoader: false, postDataErr: action.payload });
        
        case AuthAction.NEW_USER_DATA:
            return Object.assign({}, state, { users: { ...action.payload } })
        case AuthAction.SEND_MESSAGE_SUCCESS:
            return Object.assign({}, state, { chat: action.payload })
            
        default:
            return state;
    }
}