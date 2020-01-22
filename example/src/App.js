import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './store';

import * as fleet_actions from 'fleet-ui';
import * as app_actions from './actions';
import { UserListComponent } from 'fleet-ui';

const store = configureStore();

store.dispatch(fleet_actions.setAuthUser({ pk: 518, first_name: 'toto', email: 'jm.fillau@gmail.com' }));
store.dispatch(fleet_actions.setUsers([
  {
    id: 'abcd',
    email: 'toto@mapotempo.com',
    phone: '0600000000'
  }, {
    id: 'defg',
    email: 'truc@mapotempo.com',
    phone: '0600000001'
  }]));

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
