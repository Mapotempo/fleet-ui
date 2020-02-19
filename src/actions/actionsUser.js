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
      .then((users) => dispatch(receiveUsers(users)))
      .catch((errors) => dispatch(errorsUsers(errors)));
  };
};
