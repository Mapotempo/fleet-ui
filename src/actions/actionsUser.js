import { ApiUsers } from '../api';
import { flatten } from '../lib/flatten'

// =================================
// USER
// =================

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
      .all(getState().fleet.auth.users.map(authUser => ApiUsers.  apiFetchUsersCompany(
        {
          host: getState().fleet.config.host,
          apiKey: authUser.api_key
        })))
      .then(res => flatten(res))
      .then(users => {
        dispatch(receiveUsers(users));
        dispatch(fetchUserInfos());
        dispatch(fetchUserSettings());
      })
      .catch(errors => dispatch(errorsUsers(errors)));
  };
};

// =================================
// USER INFOS
// =================

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO';
const requestUserInfo = () => {
  return {
    type: REQUEST_USER_INFO
  };
};

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO';
const receiveUserInfo = (userID, userInfos) => {
  return {
    type: RECEIVE_USER_INFO,
    userInfos,
    userID
  };
};

export const ERRORS_USER_INFO = 'ERRORS_USER_INFO';
const errorsUserInfo = (errors) => {
  return {
    type: ERRORS_USER_INFO,
    errors
  };
};

export const fetchUserInfos = () => {
  return (dispatch, getState) => {
    dispatch(requestUserInfo());
    return Promise
      .all(getState().fleet.auth.users.map(
        authUser => ApiUsers.apiFetchUserInfosCompany(
          {
            host: getState().fleet.config.host,
            apiKey: authUser.api_key
          })))
      .then(res => flatten(res))
      .then(userInfosArray => {
        Object.entries(userInfosArray.reduce((accumulator, userInfo) => {
          accumulator[userInfo.user_id] = accumulator[userInfo.user_id] || [];
          accumulator[userInfo.user_id].push(userInfo);
          return accumulator;
        }, {})).map(([userID, userInfos]) => dispatch(receiveUserInfo(userID, userInfos)));
      })
      .catch(errors => dispatch(errorsUserInfo(errors)));
  };
};

// =================================
// USER SETTINGS
// =================

export const REQUEST_USER_SETTINGS = 'REQUEST_USER_SETTINGS';
const requestUserSettings = () => {
  return {
    type: REQUEST_USER_SETTINGS
  };
};

export const RECEIVE_USER_SETTINGS = 'RECEIVE_USER_SETTINGS';
const receiveUserSettings = userSettings => {
  return {
    type: RECEIVE_USER_SETTINGS,
    userSettings
  };
};

export const ERRORS_USER_SETTINGS = 'ERRORS_USER_SETTINGS';
const errorsUserSettings = errors => {
  return {
    type: ERRORS_USER_SETTINGS,
    errors
  };
};

export const fetchUserSettings = () => {
  return (dispatch, getState) => {
    dispatch(requestUserSettings());
    return Promise
      .all(getState().fleet.auth.users.map(
        authUser => ApiUsers.apiFetchUserSettingsCompany(
          {
            host: getState().fleet.config.host,
            apiKey: authUser.api_key
          })))
      .then(res => flatten(res))
      .then(userSettingsArray => userSettingsArray.map(userSettings => dispatch(receiveUserSettings(userSettings))))
      .catch(errors => dispatch(errorsUserSettings(errors)));
  };
};
