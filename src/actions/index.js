// ===================
// ==  ACTION type  ==
// ===================
export const type = {
  SET_AUTH_TOKEN: 'SET_AUTH_TOKEN',
  SET_AUTH_USER: 'SET_AUTH_USER',
  SET_USERS: 'SET_USERS'
};

// =======================
// ==  ACTION function  ==
// =======================

export const setAuthToken = (token) => {
  return {
    type: type.SET_AUTH_TOKEN,
    token
  };
};

export const setAuthUser = (user) => {
  return {
    type: type.SET_AUTH_USER,
    user
  };
};

export const setUsers = (users) => {
  return {
    type: type.SET_USERS,
    users
  };
};