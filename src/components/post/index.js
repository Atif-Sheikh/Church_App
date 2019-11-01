import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Alert, TouchableOpacity, Image, PixelRatio, ScrollView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    Container, Header, Icon, Button, Left, Body, Content, Title,
    Form, Item, Input, Label, Picker, Text, Textarea, Thumbnail
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { AuthAction } from '../../store/actions';

import { Styles, screenHeight, screenWidth, fontScale } from "../../config";

import { Loader } from "../index";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.user.userName,
            title: '',
            photo: null,
            coveredContent: '',
            time: Date.now(),
            likes: 0,
            comments: 0,
            shares: 0,
        };
    };
    static navigationOptions = {
        header: null,
    };
    onValueChange = (value) => {
        this.setState({
            postType: value,
        });
    };
    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response.uri);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                    photo: source.uri
                });
            };
        });
    };
    componentWillReceiveProps(props) {
        if (props.success) {
            this.setState({
                photo: null,
                title: "",
                postType: "",
                coveredContent: "",
                time: Date.now(),
                class: "One",
            }),
            this.props.navigation.navigate('home');
        }
    };

    _focusNextField = (nextField) => {
        this.refs[nextField]._root.focus();
    };
    
    saveData = () => {
        const { title, coveredContent } = this.state;
        if (title && coveredContent) {
            this.props.SaveData(this.state);
        } else {
            Alert.alert(null, 'Please fill form correctly!');
        }
    };

    render() {
        var photo = JSON.stringify(this.state.photo)

        Platform.OS === 'android' && StatusBar.setBarStyle('light-content', true);
        Platform.OS === 'android' && StatusBar.setBackgroundColor("#07AFB8");

        return (
            <View style={{ height: screenHeight }}>
                <ScrollView style={{ height: "100%" }}>
                    <Form style={{ height: screenHeight / 1.5, width: screenWidth / 1.1, justifyContent: "space-around", alignSelf: "center" }} >
                        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} style={{ alignSelf: "center" }}>
                            <View style={styles.avatarContainer}>
                                {this.state.photo === null ?
                                    <Icon name="ios-camera" style={{ fontSize: fontScale * 100, color: Styles.theme.textColor }} />
                                    :

                                    <Thumbnail style={{ height: "100%", width: "100%", borderRadius: 75 }} source={{ uri: this.state.photo }} resizeMode="cover" />
                                }
                            </View>
                        </TouchableOpacity>
                        <Item stackedLabel style={{ marginLeft: 0, height: screenHeight / 8 }}>
                            <Label style={{ fontFamily: Styles.fonts.Normal, color: Styles.theme.textColor }}>Post Name</Label>
                            <Input ref="title" onSubmitEditing={() => this._focusNextField('content')} returnKeyType={"next"} style={{ fontFamily: Styles.fonts.Normal, color: Styles.theme.inputTextColor, paddingTop: -10 }} value={this.state.title} onChangeText={(title) => this.setState({ title })} />
                        </Item>
                        <Item stackedLabel style={{ marginLeft: 0, height: screenHeight / 8 }}>
                            <Label style={{ fontFamily: Styles.fonts.Normal, color: Styles.theme.textColor }}>Covered Content</Label>
                            <Input ref="content" onSubmitEditing={() => this._focusNextField('title')} returnKeyType={"next"} style={{ fontFamily: Styles.fonts.Normal, color: Styles.theme.inputTextColor, paddingTop: -10 }} value={this.state.coveredContent} onChangeText={(coveredContent) => this.setState({ coveredContent })} />
                        </Item>
                        {/* <Image
                                style={{width: 200, height: 100}}
                                source={{uri: 'file:///storage/emulated/0/Android/data/com.socialapp/files/Pictures/image-3c3a20db-2bef-4a26-b049-bff38206c0da.jpg'}}
                            /> */}
                        <TouchableOpacity onPress={this.saveData} style={{ justifyContent: "center", backgroundColor: Styles.theme.buttonBackgroundColor, alignSelf: "center", marginTop: 10, width: "100%", height: screenHeight / 13, borderRadius: 5 }} >
                            <Text style={{ fontSize: Styles.fonts.h1, fontFamily: Styles.fonts.BoldItalic, alignSelf: "center", color: Styles.theme.buttonTextColor }}> Post </Text>
                        </TouchableOpacity>
                    </Form>
                </ScrollView >
                {
                    this.props.loader ? <View style={{ justifyContent: 'center', position: 'absolute', height: screenHeight, width: screenWidth, backgroundColor: 'rgba(0,0,0,0.8)' }}>
                        <Loader />
                    </View> : null
                }
            </View>
        );
    };
};
function mapStateToProp(state) {
    console.log(state.AuthReducer, "YEhhhhh")
    return ({
        user: state.AuthReducer.user,
        loader: false,
        success: false
    });
};
function mapDispatchToProp(dispatch) {
    return {
        SaveData: (obj) => {
            dispatch(AuthAction.postData(obj))
        }
    };
};
const styles = StyleSheet.create({
    avatarContainer: {
        borderColor: Styles.theme.borderColor,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 200,
        height: 200,
        marginTop: 10
    },
});
export default connect(mapStateToProp, mapDispatchToProp)(Post);