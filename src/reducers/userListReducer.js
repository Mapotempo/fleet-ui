import { type } from '../actions';

// {5: {email: 'test@mapotempo.com', phone: '0600000000' }}
const initState = {};

export default function userListReducer(state = initState, action) {
  switch (action.type) {
    case type.SET_USERS:
      state = {};
      action.users.forEach(user => {
        state[user.id] = user
      });
      break;
    case type.SET_USER:
      state = { ...state };
      state[action.user.id] = action.user
      break;
    default:
      break;
  }
  return state;
}
