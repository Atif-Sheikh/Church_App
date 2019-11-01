import React from 'react';
import { Image, View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from 'react-redux';

import { AuthAction } from '../../store/actions';

import background from '../../assets/d.png';

class Splash extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('home');
        }, 1500);
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.isAuth) {
            this.props.navigation.navigate('home');
        }
    };
    
    // getDerivedStateFromProps(nextProps, prevState){
    //     if(nextProps && nextProps.isAuth){
    //       return Actions.popAndPush('home');
    //     }
    //     else return null;
    // };

    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <Image source={background} style={styles.backgroundImage} />
            </View>
        );
    }
};

let styles = StyleSheet.create({
    backgroundImage: {
      width: '90%',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      resizeMode: 'cover', // or 'stretch'
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });


function mapStateToProps(state) {
    return ({
        user: state.AuthReducer.user,
        isAuth: state.AuthReducer.isAuthenticated,
        isError: state.AuthReducer.isError,
        loader: state.AuthReducer.signInLoading,
        checkLoader: state.AuthReducer.checkUserLoader,
        authed: state.AuthReducer.checkUser,
    });
};
function mapDispatchToProps(dispatch) {
    return {
        checkUser: () => {
            dispatch(AuthAction.CheckUser())
        },
        signin: (payload) => {
            dispatch(AuthAction.signin(payload))
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);