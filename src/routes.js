import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
    Login,
    Signup,
    ForgotPass,
    Home,
    Splash,
    Post
} from "./components";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key='loading'
                        component={Splash}

                    />
                    <Scene
                        key='login'
                        component={Login}

                    />
                    <Scene
                        key='signup'
                        component={Signup}

                    />
                    <Scene
                        key='forgotScreen'
                        component={ForgotPass}
                        title='Forgot Password'

                    />
                    <Scene
                        key='home'
                        component={Home}
                        title='Home'

                    />
                    <Scene
                        key='post'
                        component={Post}
                        title='Post'

                    />
                </Scene>
            </Router>
        );
    };
};