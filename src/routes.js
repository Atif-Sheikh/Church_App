import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
    Login,
    Signup,
    ForgotPass,
    Home,
    Splash
} from "./components";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key='loading'
                        component={Splash}
                        initial

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
                </Scene>
            </Router>
        );
    };
};