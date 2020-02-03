import apiAuth from '../api/ApiAuth';

export const REQUEST_AUTH_USER = 'REQUEST_AUTH_USER';
const requestAuthUser = () => {
  return {
    type: REQUEST_AUTH_USER
  };
};

export const RECEIVE_AUTH_USER = 'RECEIVE_AUTH_USER';
const receiveAuthUser = (user) => {
  return {
    type: RECEIVE_AUTH_USER,
    user
  };
};

export const ERROR_AUTH_USER = 'ERROR_AUTH_USER';
const errorAuthUser = (error) => {
  return {
    type: ERROR_AUTH_USER,
    error
  };
};

export const signInUsers = (syncUser, apiKey) => {
  return (dispatch, getState) => {
    dispatch(requestAuthUser());
    apiAuth.apiFetchAuthUser(syncUser,
      {
        host: getState().fleet.fleetHost,
        apiKey,
        onSuccess: (user) => {
          dispatch(receiveAuthUser(user));
        },
        onError: (error) => {
          dispatch(errorAuthUser(error));
        }
      }
    );
  };
};
