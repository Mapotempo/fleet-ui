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
    ApiUsers.apiFetchUser(
      {
        host: getState().fleet.fleetHost,
        apiKey: getState().fleet.auth.user.api_key,
        onSuccess: (users) => dispatch(receiveUsers(users)),
        onError: (errors) => errorsUsers(errors)
      }
    );
  };
};
