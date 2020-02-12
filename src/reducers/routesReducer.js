import {
  REQUEST_ROUTES, RECEIVE_ROUTES, ERRORS_ROUTES,
  RECEIVE_ROUTE_WITH_MISSIONS, REQUEST_ROUTES_WITH_MISSIONS
} from '../actions';

const initState = {
  isFetching: false,
  errors: null,
  items: []
};

export default function routesReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_ROUTES:
      state = { ...state, isFetching: true };
      break;
    case RECEIVE_ROUTES:
      state = { ...state };
      state.isFetching = false;
      state.errors = null;
      state.items = mergeRouteSet(state.items, action.routes);
      break;
    case ERRORS_ROUTES:
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    case RECEIVE_ROUTE_WITH_MISSIONS:
      // state = { ...state };
      // state.errors = null;
      // state.items = action.routes.map(route => {return {missions: [], ...route};});
      break;
    case REQUEST_ROUTES_WITH_MISSIONS:
      // state = { ...state };
      // action.routeIds.forEach(id => {
      //   if (index >= 0) {
      //     state.items[index] = {...state.items[index], isFetching: true};
      //   }
      // });
      break;
    default:
      break;
  }
  return state;
}

const mergeRouteSet = (oldRouteSet, newRouteSet) => {
  console.log('merge process');
  return newRouteSet.map(newRoute => {
    let oldRoute = oldRouteSet.find(oldRoute => oldRoute.id == newRoute.id);
    let missions = oldRoute ? oldRoute : [];
    return {missions: missions, ...newRoute};
  });
};
