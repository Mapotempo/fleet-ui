import { REQUEST_AUTH_USERS, RECEIVE_AUTH_USERS, ERRORS_AUTH_USERS } from '../actions';

const initState = {
  isFetching: false,
  isConnected: false,
  errors: null,
  // shape: [{'id': -1, 'company_id': '', 'email': '','sync_user': '', 'name': '', 'vehicle': false, 'api_key': '' }]
  users: []
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_AUTH_USERS:
      state = {...initState, isFetching: true};
      break;
    case RECEIVE_AUTH_USERS:
      state = {
        ...state,
        isFetching: false,
        isConnected: true,
        users: action.users
      };
      break;
    case ERRORS_AUTH_USERS:
      state = {
        ...state,
        isFetching: false,
        isConnected: false,
        errors: action.errors
      };
      break;
    default:
      break;
  }
  return state;
}
