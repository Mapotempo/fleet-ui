import { ApiRoutes } from '../api';

// ######
// ROUTES
// ######

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

export const fetchRoutes = () => {
  return (dispatch, getState) => {
    dispatch(requestRoutes());
    ApiRoutes.apiFetchRoutes(
      false,
      {
        host: getState().fleet.fleetHost,
        apiKey: getState().fleet.auth.user.api_key,
      }
    )
      .then((routes) => {
        dispatch(receiveRoutes(routes));
        dispatch(fetchRoutesMissions(routes));
      })
      .catch((errors) => dispatch(errorsRoutes(errors)));
  };
};

// ###################
// ROUTE WITH MISSIONS
// ###################

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

const STEP = 2;

const _fetchRoutesMissions = (routes, index = 0) => {
  return (dispatch, getState) => {
    dispatch(requestRouteMissionsBegin());
    var promises = [];
    routes.slice(index, index + STEP).forEach((route) => {
      let p = ApiRoutes.apiFetchRoute(route.id,
        {
          host: getState().fleet.fleetHost,
          apiKey: getState().fleet.auth.user.api_key
        })
        .then((route) => dispatch(receiveRouteMissions(route)))
        .catch((errors) => dispatch(errorsRoutes(errors)));
      promises.push(p);
    });
    if (promises.length > 0)
      return Promise.all(promises).finally(() => dispatch(_fetchRoutesMissions(routes, index + STEP)));
    else
      return dispatch(requestRouteMissionsEnd());
  };
};

export const fetchRoutesMissions = (routes) => {
  return (dispatch ,getState) => {
    if (!getState().fleet.routes.isFetchingRoutesMissions) {
      dispatch(requestRouteMissionsBegin());
      dispatch(_fetchRoutesMissions(routes, 0));
    }
  };
};
