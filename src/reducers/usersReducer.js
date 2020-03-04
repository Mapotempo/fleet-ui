import { RECEIVE_USERS, REQUEST_USERS, ERRORS_ROUTES } from '../actions';

// {items={5: {email: 'test@mapotempo.com', phone: '0600000000' }}, isFetching: False}
const initState = {
  isFetching: false,
  items: [],
  ready: false
};

export default function usersReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      state = { ...state, isFetching: true, ready: false };
      break;
    case RECEIVE_USERS:
      state = { ...state, isFetching: false, ready: true };
      state.items = [...action.users];
      break;
    case ERRORS_ROUTES:
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    default:
      break;
  }
  return state;
}
