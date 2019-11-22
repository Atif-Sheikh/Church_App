import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, FlatList, LayoutAnimation, ScrollView } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Icon } from 'native-base';
import { Styles, screenHeight, screenWidth } from "../../config";
import ChatCard from '../chatCard';
import { connect } from 'react-redux';

class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            onlineUsers: [],
        };
    };
    // componentDidMount() {
    //     this.props.onlineUsers();
    // };
    componentWillReceiveProps(props) {
        if (props.users) {
            let data = props.users;
            let onlineUsers = [];
            for (let key in data) {
                if (props.user && props.user.email !== data[key]['email']) {
                    if (data[key]) {
                        onlineUsers.push(data[key]);
                    }
                }
            }
            this.setState({ onlineUsers });
        };
    };

    componentDidUpdate() {
        LayoutAnimation.spring();
    };
    
    render() {
        console.log(this.state.onlineUsers, "ABCD")
        return (
            <ScrollView style={{ flex: 1 }}>
                <View style={{marginBottom:20}}>
                    <FlatList
                        data={this.state.onlineUsers}
                        renderItem={({ item }) => <ChatCard navigation={this.props.navigation} item={item} />}
                    />
                </View>
            </ScrollView>
        );
    };
};


const mapStateToProp = (state) => {
    return ({
        users: state.AuthReducer.users,
        user: state.AuthReducer.user,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // onlineUsers: () => {
        //     dispatch(DataAction.OnlineUsers());
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Sidebar);