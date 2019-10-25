import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, Button, Keyboard, Dimensions, ScrollView, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { Content, Input, Item, CheckBox, Body, Picker, Icon, Container } from 'native-base';
import { screenHeight, screenWidth, Styles } from "../../config";
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import Loader from '../loader';
import { AuthAction } from '../../store/actions';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            number: '',
        };
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            Actions.home();
        };
    };
    
    static navigationOptions = {
        header: null
    };
    
    renderFunc = () => {
        const { loader } = this.props;
        if (loader) {
            return <Loader />;
        } else {
            return (
                <TouchableOpacity onPress={this.signup} style={{ backgroundColor: Styles.theme.buttonBackgroundColor, height: screenHeight / 14, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: 5 }}>
                    <Text style={{ fontFamily: Styles.fonts.BoldItalic, color: Styles.theme.buttonTextColor, fontSize: Styles.fonts.h2 }}>Sign Up</Text>
                </TouchableOpacity>
            )
        };
    };

    onValueChange = (value) => {
        this.setState({
            accountType: value
        });
    };
    
    signup = () => {
        const { email, password, userName, number, studentClass, accountType } = this.state;
        if (email.trim() && password.trim() && userName.trim() && number.trim()) {
            const obj = {
                userName,
                email,
                password,
                number,
            };

            this.props.Signup(obj);
            Keyboard.dismiss();

        } else {
            Alert.alert(null, 'Please enter all fields correctly');
        }
    };

    _focusNextField = (nextField) => {
        this.refs[nextField]._root.focus();
    };

    render() {
        // const title = '';
        return (
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={Styles.theme.gradients2} style={{ flex: 1, alignContent: 'center' }}>
                <View style={styles.container}>
                    <View style={{ flex: 1, width: screenWidth / 1.1, alignSelf: "center", marginBottom: 50 }}>
                        <Text style={styles.welcome}>
                            Signup
                        </Text>
                        <Item style={styles.item} regular>
                            <Input placeholder='Your name' onSubmitEditing={() => this._focusNextField('email')} returnKeyType={"next"} style={styles.input} onChangeText={name => this.setState({ userName: name.trim() })} />
                        </Item>
                        <Item style={styles.item} regular>
                            <Input ref='email' textContentType='emailAddress' returnKeyType='next' onSubmitEditing={() => this._focusNextField('pass')} placeholder='Email Address' style={styles.input} onChangeText={email => this.setState({ email: email.trim() })} />
                        </Item>
                        <Item style={styles.item} regular>
                            <Input ref='pass' returnKeyType='next' onSubmitEditing={() => this._focusNextField('contact')} placeholder='************' style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password: password.trim() })} />
                        </Item>
                        <Item style={styles.item} regular>
                            <Input ref='contact' placeholder='+923********' style={styles.input} keyboardType='numeric' onChangeText={(text) => this.setState({ number: text.trim() })} />
                        </Item>
                        {this.renderFunc()}
                        <TouchableOpacity onPress={() => this.signup()} style={{ alignSelf: "center" }}>
                            <Text style={{ fontFamily: Styles.fonts.Italic, paddingTop: 5 }}>
                                Already have an account ?
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        );
    };
};

const styles = StyleSheet.create({
    welcome: {
        fontSize: Styles.fonts.h1,
        textAlign: 'center',
        fontFamily: Styles.fonts.BoldItalic,
        padding: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: 50
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        // marginBottom: 5,
    },
    input: {
        // height: 50,
        fontFamily: Styles.fonts.Normal
    },
    item: {
        width: "100%",
        // marginBottom: 30,
        borderColor: Styles.theme.borderColor,
        borderWidth: 5.0,
        // marginTop: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    innerContainer: {
        // height
        flex: 1,
        justifyContent: "space-between",
        width: screenWidth / 1.1,
        alignSelf: "center"
        // justifyContent:"center"
        // justifyContent:"space-around"
        // paddingBottom:10
    },
});

function mapStateToProp(state) {
    return ({
        user: state.AuthReducer.user,
        isError: state.AuthReducer.isError,
        loader: state.AuthReducer.signupLoader,
    });
};
function mapDispatchToProp(dispatch) {
    return {
        Signup: (payload) => {
            dispatch(AuthAction.signup(payload))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Signup);