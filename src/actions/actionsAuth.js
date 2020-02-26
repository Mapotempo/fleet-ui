import { ApiAuth } from '../api';
import { fetchWorkflow, fetchUsers } from '../actions';

export const REQUEST_AUTH_USERS = 'REQUEST_AUTH_USERS';
const requestAuthUsers = (isFetching) => {
  return {
    type: REQUEST_AUTH_USERS,
    isFetching: isFetching
  };
};

export const RECEIVE_AUTH_USERS = 'RECEIVE_AUTH_USERS';
const receiveAuthUsers = (users) => {
  return {
    type: RECEIVE_AUTH_USERS,
    users
  };
};

export const ERRORS_AUTH_USERS = 'ERRORS_AUTH_USERS';
const errorAuthUsers = (errors) => {
  return {
    type: ERRORS_AUTH_USERS,
    errors
  };
};

// {syncUser, apiKey}
export const signInUsers = (connexions) => {
  return (dispatch, getState) => {
    dispatch(requestAuthUsers(true));
    return Promise
      .all(connexions.map(({ syncUser, apiKey }) => {
        return ApiAuth.apiFetchAuthUser(syncUser,
          {
            host: getState().fleet.fleetHost,
            apiKey: apiKey
          });
      }))
      .then(users => {
        dispatch(receiveAuthUsers(users));
        dispatch(fetchWorkflow());
        dispatch(fetchUsers());
      })
      .catch((errors) => dispatch(errorAuthUsers(errors)));
  };
};
