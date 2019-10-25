import React, { Component } from 'react';
import { Container } from 'native-base';
import Routes from './src/routes';
import { Provider } from 'react-redux';

import { store } from './src/store/index';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Routes />
        </Container>
      </Provider>
    );
  };
};