import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import {
    Login,
    Signup,
    ForgotPass,
    Home
} from "./components";

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene
                        key='login'
                        component={Login}
                        initial

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