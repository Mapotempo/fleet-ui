import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './store';

import * as fleet_actions from 'fleet-ui';
import * as app_actions from './actions';
import { LiveView } from 'fleet-ui';

import "react-datepicker/dist/react-datepicker.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const store = configureStore();
store.dispatch(fleet_actions.signInUsers([
  { syncUser: '7fbbc3b1939888534fcb7b2a519d431491a91dbc6c0c26cef554e762924558df', apiKey: 'jJjAc6u1pQMkuOjBDRRVQwtt' },
  // { syncUser: 'df3db529625c0b235a31710d086934b87bbdccde7c4a4e4eed4b665d354ad94d', apiKey: 'k7sc1tgKhOkMZkAszMTfYAtt' },
  { syncUser: 'b6a474d88271e861db0b7b8405188be85d4a91ab21fc709c3e9e8d4c2a617997', apiKey: 'u3Luojq7ryWuJhYoZASJXQtt' }
]));

store.dispatch(app_actions.setAppInfo({
  app_name: 'Exemple App',
  app_version: '0.0.1',
  lib_version: '0.0.1'
}));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <LiveView />
      </Provider>
    );
  }
}
