import { ApiRoutes } from '../api';

// ######
// ROUTES
// ######

export const REQUEST_ROUTES = 'REQUEST_ROUTES';
const requestRoutes = () => {
  console.log(REQUEST_ROUTES);
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
        routes.forEach((route)=> dispatch(fetchRouteMission(route)));
      })
      .catch((errors) => dispatch(errorsRoutes(errors)));
  };
};

// ###################
// ROUTE WITH MISSIONS
// ###################

export const REQUEST_ROUTE_MISSION = 'REQUEST_ROUTE_MISSION';
export const requestRouteMissions = (route) => {
  return {
    type: REQUEST_ROUTE_MISSION,
    route
  };
};

export const RECEIVE_ROUTE_MISSIONS = 'RECEIVE_ROUTE_MISSIONS';
export const receiveRouteMissions = (route) => {
  return {
    type: RECEIVE_ROUTE_MISSIONS,
    route
  };
};

export const fetchRouteMission = (route) => {
  return (dispatch, getState) => {
    ApiRoutes.apiFetchRoute(
      route.id,
      {
        host: getState().fleet.fleetHost,
        apiKey: getState().fleet.auth.user.api_key
      })
      .then((route) => dispatch(receiveRouteMissions(route)))
      .catch((errors) => dispatch(errorsRoutes(errors)));
  };
};
