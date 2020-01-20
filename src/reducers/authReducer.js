import { type } from '../actions';

const initState = {
  token: ''
};

export default function userReducer(state = initState, action) {
  switch (action.type) {
  case type.SET_USER:
    state = {...state, ...action.user };
    break;
  default:
    break;
  }
  return state;
}
