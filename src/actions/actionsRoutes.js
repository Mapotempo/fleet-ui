import { ApiRoutes } from '../api';

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
