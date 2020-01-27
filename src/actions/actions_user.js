import apiUser from '../api/api_users';

// =======================
// ==  ACTION function  ==
// =======================
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

export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch(requestUsers());
    apiUser.apiFetchUser(
      getState().fleet.fleetHost,
      getState().fleet.auth.user.api_key,
      {
        onSuccess: (users) => {
          dispatch(receiveUsers(users));
        },
        onError: () => {
          console.error('getUserApiCall ERROR');
        }
      }
    );
  };
};
