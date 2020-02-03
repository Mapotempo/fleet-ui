import { REQUEST_ROUTES, RECEIVE_ROUTES, ERRORS_ROUTES } from '../actions';

const initState = {
  isFetching: false,
  errors: null,
  items: []
};

export default function routesReducer(state = initState, action) {
  switch (action.type) {
    case RECEIVE_ROUTES:
      state = { ...state };
      state.isFetching = false;
      state.errors = null;
      state.items = action.routes;
      break;
    case REQUEST_ROUTES:
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
