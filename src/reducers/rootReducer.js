import { combineReducers } from 'redux';

import authReducer from './authReducer';
import usersReducer from './usersReducer';

export default (fleetHost) => {
  return combineReducers({
    fleetHost: () => { return fleetHost; },
    auth: authReducer,
    users: usersReducer
  });
};
