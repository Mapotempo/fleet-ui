import { combineReducers } from 'redux';

import authReducer from './authReducer';
import userListReducer from './userListReducer';

export default (token) => {
  return combineReducers({
    auth: authReducer,
    users: userListReducer
  })
};
