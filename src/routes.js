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
    ChatRoom,
    Comments
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
        chatRoom: ChatRoom,
        comments: Comments
    },
    {
        initialRouteName: 'loading',
    }
);
  
export default createAppContainer(AppNavigator);