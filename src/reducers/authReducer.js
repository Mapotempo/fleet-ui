import {
  REQUEST_AUTH_USER,
  RECEIVE_AUTH_USER
} from '../actions';

const initState = {
  isFetching: false,
  isConnected: false,
  user: {
    id: -1,
    company_id: '',
    email: '',
    sync_user: '',
    name: '',
    vehicle: false,
    api_key: ''
  }
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_AUTH_USER:
      state = {
        ...state,
        isFetching: true,
        isConnected: false
      };
      break;
    case RECEIVE_AUTH_USER:
      state = {
        ...state,
        isFetching: false,
        isConnected: true,
        user: { ...state.user, ...action.user }
      };
      break;
    default:
      break;
  }
  return state;
}
