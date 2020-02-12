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
    ApiRoutes.apiFetchRoute(
      true,
      {
        host: getState().fleet.fleetHost,
        apiKey: getState().fleet.auth.user.api_key,
        onSuccess: (routes) => {
          dispatch(receiveRoutes(routes));
        },
        onError: (errors) => errorsRoutes(errors)
      }
    );
  };
};

// ###################
// ROUTE WITH MISSIONS
// ###################

export const REQUEST_ROUTES_WITH_MISSIONS = 'REQUEST_ROUTES_WITH_MISSIONS';
export const requestRoutesWithMissions = (routeIds) => {
  return {
    type: REQUEST_ROUTES_WITH_MISSIONS,
    routeIds
  };
};

export const RECEIVE_ROUTE_WITH_MISSIONS = 'RECEIVE_ROUTE_WITH_MISSIONS';

// export const fetchRouteMissions = (routeId) => {
//   return (dispatch) => {
//     dispatch(requestRouteWithMissions(routeId));
//   };
// };
