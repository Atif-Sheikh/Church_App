import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Container, Header, Content, Button, Icon, List, ListItem } from 'native-base';
import { Actions } from "react-native-router-flux";

import { screenHeight, screenWidth, Styles } from "../../config";

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        };
    };
    static navigationOptions = {
        header: null
    };

    render() {
        const { data } = this.props;
        return (
            <View style={{ height: screenHeight, width: screenWidth }}>
                <ScrollView style={{ flex: 1 }}>
                    {
                        data.map(notify => 
                            <ListItem onPress={() => this.props.navigation.navigate('home')} style={{ flexDirection: "column", height: screenHeight / 10, width: screenWidth, marginLeft: 0, padding: 10, alignItems: "flex-start" }}>
                                <Text style={{ fontFamily: Styles.fonts.Normal, fontSize: Styles.fonts.regular, maxWidth: "90%", color: "#000" }} numberOfLines={1}>{notify.name}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontFamily: Styles.fonts.Bold, fontSize: Styles.fonts.medium, maxWidth: "90%", color: "gray" }}>Due Date : </Text>
                                    <Text style={{ fontFamily: Styles.fonts.Normal, fontSize: Styles.fonts.medium, maxWidth: "90%", color: "gray" }}>{notify.mutualFriends}</Text>
                                </View>
                            </ListItem>
                        )
                    }
                    {/* <Text style={{ fontFamily: Styles.fonts.Normal, fontSize: Styles.fonts.h2, color: "gray" }}>No Notification Found</Text> */}
                </ScrollView>
            </View>
        );
    }
};

export default Notification;