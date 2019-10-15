import React, { Component } from 'react';
import { Container } from 'native-base';
import Routes from './src/routes';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Routes />
      </Container>
    );
  };
};