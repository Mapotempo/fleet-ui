import { type } from '../actions';

const initState = {
  app_name: "Example",
  app_version: "0.0.0",
  lib_version: "0.0.0"
};

export default function appReducer(state = initState, action) {
  switch (action.type) {
  case type.SET_APP_INFO:
    state = { ...state, ...action.app_info };
    break;
  default:
    break;
  }
  return state;
}
