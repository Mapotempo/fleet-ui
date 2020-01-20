import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import './index.css';
import App from './App';

import * as fleet_actions from 'fleet-ui/src/actions';
import * as app_actions from './actions';

const store = configureStore();

store.dispatch(fleet_actions.setUser({ pk: 518, first_name: 'maxime', email: 'jm.fillau@gmail.com' }));
store.dispatch(app_actions.setAppInfo({
  app_name: 'Exemple App',
  app_version: '0.0.1',
  lib_version: '0.0.1'
}));

ReactDOM.render(<App />, document.getElementById('root'));
