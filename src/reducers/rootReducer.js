import { combineReducers } from 'redux';

import configReducerFactory from './configReducerFactory';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import routesReducer from './routesReducer';
import workflowReducer from './workflowReducer';

export default (fleetHost) => {
  return combineReducers({
    config: configReducerFactory({host: fleetHost}),
    auth: authReducer,
    users: usersReducer,
    routes: routesReducer,
    workflow: workflowReducer
  });
};
