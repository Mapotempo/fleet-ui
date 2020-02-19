import { ApiRoutes } from '../api';
import { tokenBySyncUserSelector } from '../selectors/authSelectors';

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

const STEP = 20;

const _recursiveFetchRoutesMissions = (routes, index = 0) => {
  return (dispatch, getState) => {
    return Promise
      .all(
        routes.slice(index, index + STEP).map((route) => ApiRoutes.apiFetchRoute(route.id,
          {
            host: getState().fleet.fleetHost,
            apiKey: tokenBySyncUserSelector(getState(), route.sync_user)
          })
          .then(route => dispatch(receiveRouteMissions(route)))
          .catch(errors => dispatch(errorsRoutes(errors)))
        ))
      .finally(() => {
        if (index + STEP < routes.length)
          dispatch(_recursiveFetchRoutesMissions(routes, index + STEP));
        else
          dispatch(requestRouteMissionsEnd());
      });
  };
};

export const fetchRoutesMissions = (routes) => {
  return (dispatch ,getState) => {
    if (!getState().fleet.routes.isFetchingRoutesMissions) {
      dispatch(requestRouteMissionsBegin());
      dispatch(_recursiveFetchRoutesMissions(routes, 0));
    }
  };
};
