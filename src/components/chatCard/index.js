import React, { Component } from 'react';
import { Image, Dimensions, ScrollView } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import moment from 'moment';

import { screenHeight, Styles } from "../../config";

export default class ChatCard extends Component {
  render() {
    const { userName, online, photo, Uid, deviceToken } = this.props.item;
    return (
        <List>
          <ListItem style={{ height: screenHeight / 12 }} onPress={() => this.props.navigation.navigate('chatRoom', { name: userName, online, Uid, deviceToken })} avatar>
            <Thumbnail small source={photo ? { uri: photo } : { uri: 'https://res.cloudinary.com/atif786/image/upload/v1572551774/dokz6y90fmngmiland17.jpg' }} />
            <Body style={{ height: screenHeight / 12,justifyContent:"center" }}>
              <Text style={{ fontSize: Styles.fonts.regular,fontFamily:Styles.fonts.Bold }}>{userName}</Text>
            </Body>
            <Right style={{ marginLeft: -15,justifyContent:"center" }}>
              {/* <Image style={{width: fontScale*}} src={green} /> */}
              <Text style={{fontFamily:Styles.fonts.Normal}} note>{typeof (online) == "number" ? moment(online).fromNow() : 'online'}</Text>
            </Right>
          </ListItem>
        </List>
    );
  };
};