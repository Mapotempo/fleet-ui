import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';

import * as fleet_actions from 'fleet-ui';
import * as app_actions from './actions';
import { UserListComponent } from 'fleet-ui';

const store = configureStore();
store.dispatch(fleet_actions.signInUsers('7fbbc3b1939888534fcb7b2a519d431491a91dbc6c0c26cef554e762924558df', '0Q3gGkMDdF06l7VzUWwa6Qtt'));
setTimeout(() => {
  store.dispatch(fleet_actions.fetchUsers());
}, 3000);


store.dispatch(app_actions.setAppInfo({
  app_name: 'Exemple App',
  app_version: '0.0.1',
  lib_version: '0.0.1'
}));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <UserListComponent text='Modern React component module' />
        </div>
      </Provider>
    );
  }
}
