import { RECEIVE_USERS, REQUEST_USERS, ERRORS_ROUTES } from '../actions';

// {items={5: {email: 'test@mapotempo.com', phone: '0600000000' }}, isFetching: False}
const initState = {
  isFetching: false,
  items: []
};

export default function usersReducer(state = initState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      state = { ...state };
      state.isFetching = false;
      state.items = {};
      state.items = [...action.users];
      break;
    case REQUEST_USERS:
      state = { ...state, isFetching: true };
      break;
    case ERRORS_ROUTES:
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    default:
      break;
  }
  return state;
}
