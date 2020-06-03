import { ApiUsers } from '../api';

export const REQUEST_USERS = 'REQUEST_USERS';
const requestUsers = () => {
  return {
    type: REQUEST_USERS
  };
};

export const RECEIVE_USERS = 'RECEIVE_USERS';
const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users
  };
};

export const ERRORS_USERS = 'ERRORS_USERS';
const errorsUsers = (errors) => {
  return {
    type: ERRORS_USERS,
    errors
  };
};

export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    return Promise
      .all(getState().fleet.auth.users.map((authUser) => ApiUsers.apiFetchUser(
        {
          host: getState().fleet.fleetHost,
          apiKey: authUser.api_key
        })))
      .then(res => res.flat())
      .then((users) => {
        dispatch(receiveUsers(users));
        users.forEach(user => {
          dispatch(fetchUserInfos(user));
        });
      })
      .catch((errors) => dispatch(errorsUsers(errors)));
  };
};

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
const requestUserInfo = () => {
  return {
    type: REQUEST_USER_INFO
  };
};

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
const receiveUserInfo = (userInfo) => {
  console.log('user_info', userInfo);
  return {
    type: RECEIVE_USER_INFO,
    userInfo
  };
};

export const ERRORS_USER_INFO = 'ERRORS_USER_INFO';
const errorsUserInfo = (errors) => {
  return {
    type: ERRORS_USER_INFO,
    errors
  };
};

export const fetchUserInfos = (user) => {
  return (dispatch, getState) => {
    dispatch(requestUserInfo());
    return Promise
      .all(getState().fleet.auth.users.map((authUser) => ApiUsers.apiFetchUserInfo(
        user.sync_user,
        {
          host: getState().fleet.fleetHost,
          apiKey: authUser.api_key
        })))
      .then((userInfo) => dispatch(receiveUserInfo(userInfo)))
      .catch((errors) => dispatch(errorsUserInfo(errors)));
  };
};
