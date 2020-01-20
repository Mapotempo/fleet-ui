// ===================
// ==  ACTION type  ==
// ===================
export const type = {
  SET_APP_INFO: 'SET_APP_INFO'
};

export const setAppInfo = (app_info) => {
  return {
    type: type.SET_APP_INFO,
    app_info
  };
};
