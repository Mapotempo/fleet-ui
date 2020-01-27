import {
  RECEIVE_USERS,
  REQUEST_USERS
} from '../actions';

// {items={5: {email: 'test@mapotempo.com', phone: '0600000000' }}, isFetching: False}
const initState = {
  isFetching: false,
  items: {}
};

export default function usersReducer(state = initState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      state = { ...state };
      state.isFetching = false;
      state.items = {};
      action.users.forEach(user => {
        state.items[user.id] = user;
      });
      break;
    case REQUEST_USERS:
      state = { ...state, isFetching: true };
      break;
    default:
      break;
  }
  return state;
}
