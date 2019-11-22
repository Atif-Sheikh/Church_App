import React, { Component } from 'react';
import { Platform, StatusBar, FlatList, View, Image, Dimensions, BackHandler, DeviceEventManager, Alert, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import {
    Container, Header, Title, Content, Button, Icon, Left, Right, Body, Text,
    Item, Input, Label, Form, Tab, Tabs, TabHeading, Fab, Card, CardItem, Spinner, Badge
} from 'native-base';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Drawer } from 'native-base';
import Notification from '../notifications';
import { Sidebar, Loader, CardsItem, LeftDrawerContent } from '../index';
import { connect } from 'react-redux';

import { Styles, screenHeight, fontScale, screenWidth } from "../../config";
import { AuthAction } from '../../store/actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            loading: false,
            requests: [
                { name: 'Marry Collen', mutualFriends: 4 },
                { name: 'Robert Alex', mutualFriends: 6 },
                { name: 'Calvin Collen', mutualFriends: 2 },
            ],
            posts: []
        };
        props.listenUser();
    };

    static navigationOptions = {
        header: null,
    };

    componentWillMount() {
        this.props.getPosts();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.posts) {
            Object.values(nextProps.posts).map((post, ind) => {
                post.key = Object.keys(nextProps.posts)[ind];
            });
            let posts = Object.values(nextProps.posts);
            posts = posts.sort((a, b) => b.time - a.time);
            this.setState({
                posts,
                isFetching: false,
                // keys: Object.keys(nextProps.posts),
            })

        }
    };

    closeDrawer = () => {
        this.drawer._root.close()
    };

    openDrawer = () => {
        this.drawer._root.open()
    };

    closeLeftDrawer = () => {
        this.LeftDrawer._root.close()
    };

    openLeftDrawer = () => {
        this.LeftDrawer._root.open()
    };

    _onPressOkay = () => {
        // this.props.clearStore();
        BackHandler.exitApp();
    };

    _handlePress = () => {
        // if (Actions.currentScene === "home") {
        //     Alert.alert(
        //         'Exit App',
        //         'Exiting the application?',
        //         [
        //             { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        //             { text: 'OK', onPress: () => { 
                        this._onPressOkay() 
                    // } 
        //             },
        //         ],
        //         { cancelable: true }
        //     )
        // } else {
        //     // Actions.pop();
        // }
        // return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this._handlePress)
        database().ref('.info/connected').on('value', snapshot => {
            if (snapshot && this.props.user && this.props.user.Uid) {
                database().ref(`/users/${auth().currentUser.uid}`).onDisconnect().update({ online: database.ServerValue.TIMESTAMP });
                database().ref(`/users/${auth().currentUser.uid}`).update({ online: true });
            }
            // else{
            //     firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).update({online: false});
            // }
        });
    };

    componentWillUnmount(){
        BackHandler.removeEventListener("hardwareBackPress", this._handlePress)
    };
    
    _onRefresh() {
        this.setState({ isFetching: true }, () => this.props.getPosts());
    };
    
    _onSearch = (val) => {

    };

    render() {
        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor("#07AFB8");
        console.log(this.props.user, ">>YE EDKHoo")
        return (
            <View style={{ height: screenHeight }}>
                <Drawer
                    type="displace" //:overlay:static
                    ref={(ref) => { this.drawer = ref; }}
                    panOpenMask={20}
                    content={<Sidebar navigation={this.props.navigation} />}
                    onClose={() => this.closeDrawer()} >
                    <Drawer
                        type="displace"
                        side='right'
                        ref={(ref) => { this.LeftDrawer = ref; }}
                        content={<LeftDrawerContent navigation={this.props.navigation} />}
                        onClose={() => this.closeLeftDrawer()} >
                        <Header style={{ display: 'flex', backgroundColor: Styles.theme.headerBackgroundColor, flexDirection: 'row', alignItems: "center" }} hasTabs>
                            <View style={{ flex: 1 }}>
                                <Button onPress={this.openDrawer} transparent>
                                    <Icon style={{ fontSize: Styles.fonts.large, width: 30, color: Styles.theme.headerTextColor }} name="menu" />
                                </Button>
                            </View>
                            <View style={{ flex: 4 }}>
                                <Item style={{ height: screenHeight / 13 }}>
                                    <Input returnKeyType='search' onChangeText={(text) => this._onSearch(text)}
                                        style={{ color: Styles.theme.headerTextColor, fontFamily: Styles.fonts.Normal }} placeholderTextColor={Styles.theme.headerTextColor}
                                        placeholder="Search"
                                    // onSubmitEditing={() => this._focusNextField('pass')}
                                    />
                                    <Icon size={Styles.fonts.small} style={{ color: Styles.theme.headerTextColor }} name='search' />
                                </Item>
                            </View>
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                                <Icon onPress={this.openLeftDrawer} style={{ color: Styles.theme.headerTextColor, fontSize: Styles.fonts.large }} name='person' />
                            </View>
                        </Header>
                        <Tabs locked={true}>
                            <Tab
                                heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Styles.theme.backgroundColor }}>
                                    <Icon style={styles.tabIcon} name="paper" />
                                    <Text style={styles.tabText}>Status</Text>
                                </TabHeading>}>
                                <FlatList
                                    data={this.state.posts}
                                    renderItem={({ item, index }) => <CardsItem navigation={this.props.navigation} Uid={this.props.user ? this.props.user.Uid : ''} pushKey={item.key} item={item} />}
                                    keyExtractor={(item, key) => key.toString()}
                                    onRefresh={() => this._onRefresh()}
                                    refreshing={this.state.isFetching}
                                    style={{ marginBottom: 20 }}
                                // ListFooterComponent={this.renderFooter}  
                                />
                                <Fab
                                    onPress={() => this.props.navigation.navigate('post')}
                                    active={false}
                                    style={{ backgroundColor: Styles.theme.backgroundColor, position: "absolute", marginBottom: 20 }}
                                >
                                    <Icon name="add" />
                                </Fab>
                                
                                {
                                    this.props.loader ? <View pointerEvents='none' style={{ justifyContent: 'center', position: 'absolute', width: '100%', height: '100%', alignItems: "center" }}>
                                        <Loader />
                                    </View> : null
                                }

                            </Tab>

                            <Tab heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Styles.theme.backgroundColor }}>
                                <Icon style={styles.tabIcon} name="ios-notifications" />
                                <Text style={styles.tabText}>Notifications</Text>
                            </TabHeading>}>
                                <Notification data={this.state.requests} />
                            </Tab>
                            <Tab heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Styles.theme.backgroundColor }}>
                                <Icon style={styles.tabIcon} name="people" />
                                <Text style={styles.tabText}>Chats</Text>
                            </TabHeading>}>
                                {/* <ChildrenScreen /> */}
                            </Tab>
                            <Tab heading={<TabHeading style={{ flexDirection: 'column', backgroundColor: Styles.theme.backgroundColor }}>
                                <Icon style={styles.tabIcon} name="md-book" />
                                <Text style={styles.tabText}>Bible</Text>
                            </TabHeading>}>
                                {/* <Userslist /> */}
                            </Tab>
                        </Tabs>
                        {/* </Content> */}
                    </Drawer>
                </Drawer>
            </View>
        );
    };
};
const styles = StyleSheet.create({
    tabIcon: {
        fontSize: Styles.fonts.h2,
        color: Styles.theme.normalColor
    },
    tabText: {
        fontSize: Styles.fonts.medium,
        color: Styles.theme.normalColor,
        fontFamily: Styles.fonts.Bold
    }
});

const mapStateToProp = (state) => {
    console.log(state)
    return {
        posts: state.AuthReducer.posts,
        request: [],
        user: state.AuthReducer.user,
        users: state.AuthReducer.users,
        loader: state.AuthReducer.postsLoader,
        // lastScene: state.DataReducer.lastScene,
        // notifications: state.DataReducer.notifications,
    };
};
const mapDispatchToProp = (dispatch) => {
    return {
        getPosts: () => {
            // dispatch(GetPosts())
            dispatch(AuthAction.getData())
        },
        requests: () => {
            // dispatch(Requests())
        },
        // getUsers: () => {
        //     dispatch(DataAction.getUsers())
        // },
        // clearStore: () => {
        //     dispatch(AuthAction.ClearStore())
        // },
        // fetchNotifications: () => {
        //     dispatch(DataAction.fetchNotifications())
        // },
        // getLastScene: (payload) => {
        //     dispatch(DataAction.getLastScene(payload))
        // },
        // fetchDoneTasks: (payload) => {
        //     dispatch(DataAction.fetchDoneTasks(payload))
        // },
        listenUser: () => {
            dispatch(AuthAction.listUser())
        }
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);