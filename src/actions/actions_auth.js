import apiAuth from '../api/api_auth';

// =======================
// ==  ACTION function  ==
// =======================
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

export const signInUsers = (syncUser, apiKey) => {
  return (dispatch, getState) => {
    dispatch(requestAuthUser());
    apiAuth.apiFetchAuthUser(getState().fleet.fleetHost, syncUser, apiKey,
      {
        onSuccess: (user) => {
          dispatch(receiveAuthUser(user));
        },
        onError: (error) => {
          console.error('apiFetchAuthUser ERROR', error);
        }
      }
    );
  };
};
