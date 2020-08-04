import {
  RESET_STATE, REQUEST_ROUTES, RECEIVE_ROUTES, ERRORS_ROUTES,
  RECEIVE_ROUTE_MISSIONS, REQUEST_ROUTES_MISSIONS_BEGIN, REQUEST_ROUTES_MISSIONS_END
} from '../actions';
import { initialExtraInfo } from '../lib/extraInfo';
import { generateId } from '../lib/random';

const initState = () => {
  return {
    errors: null,
    items: [],
    isFetching: false,
    isFetchingRoutesMissions: false,
    _fetchSession: generateId()
  };
};

export default function routesReducer(state = initState(), action) {
  switch (action.type) {
    case RESET_STATE:
      state = initState();
      break;
    case REQUEST_ROUTES:
      state = { ...state, isFetching: true };
      break;
    case RECEIVE_ROUTES:
      state = { ...state, isFetching: false, errors: null };
      state.items = action.routes.map(newRoute => {
        let oldRoute = state.items.find(oldRoute => oldRoute.id == newRoute.id);
        // Conserve previous missions and extraInfo
        newRoute.missions = (oldRoute && oldRoute.missions) ? oldRoute.missions : [];
        newRoute.extraInfo = (oldRoute && oldRoute.extraInfo) ? oldRoute.extraInfo : initialExtraInfo();
        return {...newRoute};
      });
      break;
    case ERRORS_ROUTES:
      console.error(action.errors);
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    case REQUEST_ROUTES_MISSIONS_BEGIN:
      state = { ...state, isFetchingRoutesMissions: true };
      break;
    case REQUEST_ROUTES_MISSIONS_END:
      state = { ...state, isFetchingRoutesMissions: false };
      break;
    case RECEIVE_ROUTE_MISSIONS:
      var index = state.items.findIndex(route => route.id == action.route.id);
      if (index >= 0) {
        state = { ...state, items: [...state.items] };
        state.items[index] = {...action.route, extraInfo: action.extraInfo};
      }
      break;
    default:
      break;
  }
  return state;
}
