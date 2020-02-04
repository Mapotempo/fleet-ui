import { createSelector } from 'reselect';

// =========
// Selectors
// =========

const routesSelector = state => state.fleet.routes.items;

const missionStatusTypesSelector = state => state.fleet.workflow.missionStatusTypeItems;

const usersSelector = state => state.fleet.users.items;

export const routesFullInfo = createSelector(
  routesSelector,
  missionStatusTypesSelector,
  usersSelector,
  (routes, missionStatusTypes, users) => {
    return routes.map(route => {
      return {
        ...route,
        user: users[route.user_id],
        info: computeRouteInfo(route) // Shape: {advancing, departure, eta}
      };
    });
  }
);

// ==================
// Compute Route Info
// ==================

const computeAdvancing = (actualDate, departureDate, eta) => {
  if (actualDate > eta)
    return 100;
  else if (actualDate > departureDate)
    return Math.round(((actualDate - departureDate) / (eta - departureDate)) * 100);
  else
    return 0;
};
    
const computeRouteInfo = (route) => {
  let actualDate = new Date();
  return route.missions.reduce((accumulator, currentValue) => {
    // Choosed the better ETA source
    let currentEtaValue = currentValue.eta ? currentValue.eta : currentValue.date;
    if (currentEtaValue > accumulator.eta)
    {
      accumulator.eta = currentEtaValue;
      accumulator.advancing = computeAdvancing(actualDate, new Date(accumulator.departure), new Date(accumulator.eta));
    }
    let add = accumulator.missionStatusTypeIds[currentValue.mission_status_type_id] ? accumulator.missionStatusTypeIds[currentValue.mission_status_type_id] : 0;
    accumulator.missionStatusTypeIds[currentValue.mission_status_type_id] = add + 1;
    return accumulator;
  },
  {
    finalMissionStatusTypeIds: {},
    missionStatusTypeIds: {},      
    advancing: 0,
    departure: route.date,
    eta: '1970-01-01T00:00:00.000'
  });
};
