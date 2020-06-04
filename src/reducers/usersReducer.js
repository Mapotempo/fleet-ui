import {
  RECEIVE_USERS, REQUEST_USERS, ERRORS_USERS,
  REQUEST_USER_INFO, RECEIVE_USER_INFO, ERRORS_USER_INFO
} from '../actions';

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
      state.items = action.users.map(user => {return {...user, "user_infos": []};});
      break;
    case REQUEST_USER_INFO:
      // TODO: Nothing to do for the moment
      break;
    case RECEIVE_USER_INFO:
      var index = state.items.findIndex(user => user.id == action.user.id);
      if (index >= 0) {
        console.log(action.user_infos);
        state = { ...state, items: [...state.items] };
        state.items[index] = {...state.items[index], "user_infos": [...action.user_infos]};
      }
      break;
    case ERRORS_USER_INFO:
    case ERRORS_USERS:
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    default:
      break;
  }
  return state;
}
