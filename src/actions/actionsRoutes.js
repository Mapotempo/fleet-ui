import { ApiRoutes } from '../api';
import { tokenBySyncUserSelector } from '../selectors/authSelectors';

// ##########
// ALL ROUTES
// ##########
export const fetchRoutes = () => {
  return (dispatch, getState) => {
    // Prevent multi fetching
    if (getState().fleet.routes.isFetching ||
        getState().fleet.routes.isFetchingRoutesMissions)
      return Promise.resolve();

    dispatch(requestRoutes());
    return Promise.all(
      getState().fleet.auth.users.map((authUser) =>
        ApiRoutes.apiFetchRoutes(false,
          {
            host: getState().fleet.fleetHost,
            apiKey: authUser.api_key,
          })))
      .then(res => res.flat())
      .then(routes => {
        dispatch(receiveRoutes(routes));
        dispatch(fetchRoutesMissions(routes));
      })
      .catch(errors => dispatch(errorsRoutes(errors)));
  };
};

export const REQUEST_ROUTES = 'REQUEST_ROUTES';
const requestRoutes = () => {
  return {
    type: REQUEST_ROUTES
  };
};

export const RECEIVE_ROUTES = 'RECEIVE_ROUTES';
const receiveRoutes = (routes) => {
  return {
    type: RECEIVE_ROUTES,
    routes
  };
};

export const ERRORS_ROUTES = 'ERRORS_ROUTES';
const errorsRoutes = (errors) => {
  return {
    type: ERRORS_ROUTES,
    errors
  };
};

// ###################
// ROUTE WITH MISSIONS
// ###################

const ROUTES_BY_STEP = 20;

export const fetchRoutesMissions = (routes) => {
  return async(dispatch, getState) => {
    // Prevent multi fetching
    if (getState().fleet.routes.isFetchingRoutesMissions)
      return;

    dispatch(requestRouteMissionsBegin());
    var index = 0;
    while (index < routes.length) {
      let routeSliced = routes.slice(index, index + ROUTES_BY_STEP);
      await dispatch(_fetchRoutesMissions(routeSliced));
      index += ROUTES_BY_STEP;
    }
    dispatch(requestRouteMissionsEnd());
  };
};

const _fetchRoutesMissions = (routes) => {
  return (dispatch, getState) => {
    return Promise
      .all(routes.map((route) => ApiRoutes
        .apiFetchRoute(route.id, {
          host: getState().fleet.fleetHost,
          apiKey: tokenBySyncUserSelector(getState(), route.sync_user)
        })
        .then(route => dispatch(receiveRouteMissions(route)))
        .catch(errors => dispatch(errorsRoutes(errors)))
      ));
  };
};

export const REQUEST_ROUTES_MISSIONS_BEGIN = 'REQUEST_ROUTES_MISSIONS_BEGIN';
const requestRouteMissionsBegin = (route) => {
  return {
    type: REQUEST_ROUTES_MISSIONS_BEGIN,
    route
  };
};

export const REQUEST_ROUTES_MISSIONS_END = 'REQUEST_ROUTES_MISSIONS_END';
const requestRouteMissionsEnd = (route) => {
  return {
    type: REQUEST_ROUTES_MISSIONS_END,
    route
  };
};

export const RECEIVE_ROUTE_MISSIONS = 'RECEIVE_ROUTE_MISSIONS';
const receiveRouteMissions = (route) => {
  return {
    type: RECEIVE_ROUTE_MISSIONS,
    route
  };
};

