// ===================
// ==  ACTION type  ==
// ===================
export const type = {
  SET_TOKEN: 'SET_TOKEN',
  SET_USER: 'SET_USER'
};

// =======================
// ==  ACTION function  ==
// =======================

export const setToken = (user) => {
  return {
    type: type.SET_TOKEN,
    user
  };
};

export const setUser = (user) => {
  return {
    type: type.SET_USER,
    user
  };
};
