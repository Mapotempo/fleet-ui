import { ApiRoutes } from '../api';
import { computeExtraInfo } from '../lib/extraInfo';
import { tokenBySyncUserSelector } from '../selectors/authSelectors';
import { missionStatusTypesMapper } from '../selectors/workflowSelectors';
import { flatten } from '../lib/flatten';

/**
 * cancelFetchAndResetState
 *
 * cancel all current fetch and reset route state
 */
export const cancelFetchAndResetState = () => {
  return (dispatch) => {
    ApiRoutes.cancelFetch();
    dispatch(resetState());
  };
};

export const RESET_STATE = 'RESET_STATE';
const resetState = () => {
  return {
    type: RESET_STATE
  };
};

/**
 * fetchRoutesOnDates
 *
 * fetch all routes between dates (with empty missions array)
 * @param {Date} from valid date
 * @param {Date} to   valid date
 */
export const fetchRoutesOnDates = (from, to) => {
  return (dispatch, getState) => {
    // Prevent multi fetching
    if (getState().fleet.routes.isFetching ||
        getState().fleet.routes.isFetchingRoutesMissions)
      return Promise.resolve();

    dispatch(requestRoutes());
    return Promise.all(
      getState().fleet.auth.users.map((authUser) =>
        ApiRoutes.apiFetchRoutes(false, from ,to,
          {
            host: getState().fleet.config.host,
            apiKey: authUser.api_key,
          })))
      .then(res => flatten(res)) // flat routes arrays
      .then(routes => { // remove duplicate route (multi same account case)
        let routeIds = {};
        return routes.filter(route => {
          let res = !routeIds[route.id];
          routeIds[route.id] = route.id;
          return res;
        });})
      .then(routes => dispatch(receiveRoutes(routes))) // proccess receive route action
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

const ROUTES_BY_STEP = 20;

/**
 * fetchRoutesMissions
 *
 * fetch routes with missions details
 * ROUTES_BY_STEP define the number of missions fetch by step
 * @param {Array} routes Array of route
 */
export const fetchRoutesMissions = (routes) => {
  return async(dispatch, getState) => {
    if (getState().fleet.routes.isFetchingRoutesMissions) // Prevent multi fetching
      return;

    dispatch(requestRouteMissionsBegin());
    var index = 0;
    let session = getState().fleet.routes._fetchSession;
    while (index < routes.length
      && session === getState().fleet.routes._fetchSession) {
      let routeSliced = routes.slice(index, index + ROUTES_BY_STEP);
      await dispatch(_fetchRoutesMissions(routeSliced)); // await for previous ROUTES_BY_STEP fetches
      index += ROUTES_BY_STEP;
    }
    dispatch(requestRouteMissionsEnd());
  };
};

const _fetchRoutesMissions = (routes) => {
  return (dispatch, getState) => {
    let missionStatusTypesMap = missionStatusTypesMapper(getState());
    return Promise.all(routes.map((route) => ApiRoutes
      .apiFetchRoute(route.id, {
        host: getState().fleet.config.host,
        apiKey: tokenBySyncUserSelector(getState(), route.sync_user)
      })
      .then(route => dispatch(receiveRouteMissions(route,
        computeExtraInfo(route, missionStatusTypesMap,
          getState().fleet.config.delayLowThreashold,
          getState().fleet.config.delayHightThreashold))))
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
const receiveRouteMissions = (route, extraInfo) => {
  return {
    type: RECEIVE_ROUTE_MISSIONS,
    route,
    extraInfo: extraInfo
  };
};
