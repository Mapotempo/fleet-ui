import { type } from '../actions';

const initState = {
  auth_token: '',
  auth_user: {
    pk: -1,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: ''
  }
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case type.SET_AUTH_TOKEN:
      state = {
        ...state,
        auth_token: action.token
      };
      break;
    case type.SET_AUTH_USER:
      state = {
        ...state,
        auth_user: { ...state.user, ...action.user }
      }
    default:
      break;
  }
  return state;
}
