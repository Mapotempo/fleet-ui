import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

import * as fleet_actions from 'fleet-ui';
import * as app_actions from './actions';
import { LiveView } from 'fleet-ui';

const store = configureStore();
store.dispatch(fleet_actions.signInUsers('7fbbc3b1939888534fcb7b2a519d431491a91dbc6c0c26cef554e762924558df', 'jJjAc6u1pQMkuOjBDRRVQwtt'));
// store.dispatch(fleet_actions.signInUsers('df3db529625c0b235a31710d086934b87bbdccde7c4a4e4eed4b665d354ad94d', 'k7sc1tgKhOkMZkAszMTfYAtt'));

store.dispatch(app_actions.setAppInfo({
  app_name: 'Exemple App',
  app_version: '0.0.1',
  lib_version: '0.0.1'
}));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <UserListComponent /> */}
        <LiveView routePerPage={10}/>
      </Provider>
    );
  }
}
