import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

// reducers
import { AuthReducer } from './reducer/index';
import { AuthEpic } from './epic/index'


// const _epicMiddleware = createEpicMiddleware();

const rootEpic = combineEpics(
    AuthEpic.SignupEpic,
    AuthEpic.SigninEpic,
    AuthEpic.Logout
);

const rootReducer = combineReducers({
    AuthReducer: AuthReducer,
});

const epicMiddleware = createEpicMiddleware();

export const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);