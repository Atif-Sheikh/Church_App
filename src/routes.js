import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    Login,
    Signup,
    ForgotPass,
    Home,
    Splash,
    Post,
    ChatRoom
} from "./components";



const AppNavigator = createStackNavigator(
    {
        loading: Splash,
        home: Home,
        signup: Signup,
        login: Login,
        forgotScreen: ForgotPass,
        post: Post,
        home: Home,
        chatRoom: ChatRoom
    },
    {
        initialRouteName: 'loading',
    }
);
  
export default createAppContainer(AppNavigator);