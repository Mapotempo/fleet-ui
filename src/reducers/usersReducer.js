import {
  RECEIVE_USERS, REQUEST_USERS, ERRORS_USERS,
  REQUEST_USER_INFO, RECEIVE_USER_INFO, ERRORS_USER_INFO,
  REQUEST_USER_SETTINGS, RECEIVE_USER_SETTINGS, ERRORS_USER_SETTINGS
} from '../actions';

// {items={5: {email: 'test@mapotempo.com', phone: '0600000000' }}, isFetching: False}
const initState = {
  isFetching: false,
  items: [],
  ready: false,
  errors: null
};

export default function usersReducer(state = initState, action) {
  var index = null;
  switch (action.type) {
    case REQUEST_USERS:
      state = { ...state, isFetching: true, ready: false };
      break;
    case RECEIVE_USERS:
      state = { ...state, isFetching: false, ready: true };
      state.items = action.users.map(
        user => {
          return {
            ...user,
            "user_infos": [],
            "user_settings": null
          };
        });
      break;
    case REQUEST_USER_INFO:
      // TODO: Nothing to do for the moment
      break;
    case RECEIVE_USER_INFO:
      index = state.items.findIndex(user => user.id == action.userID);
      if (index >= 0) {
        state = { ...state, items: [...state.items] };
        state.items[index] = {
          ...state.items[index],
          "user_infos": [...action.userInfos],
          "user_settings": null
        };
      }
      break;
    case REQUEST_USER_SETTINGS:
      // TODO: Nothing to do for the moment
      break;
    case RECEIVE_USER_SETTINGS:
      index = state.items.findIndex(user => user.id == action.userSettings.user_id);
      if (index >= 0) {
        state = { ...state, items: [...state.items] };
        state.items[index] = {...state.items[index], "user_settings": action.userSettings};
      }
      break;

    case ERRORS_USER_SETTINGS:
    case ERRORS_USER_INFO:
    case ERRORS_USERS:
      console.error(action.errors);
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    default:
      break;
  }
  return state;
}
