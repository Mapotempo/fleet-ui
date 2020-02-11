import { createSelector } from 'reselect';
import { usersMapper } from './userSelectors';
import { finalMissionStatusTypeInfo } from './workflowSelectors';

// =========
// Selectors
// =========

const routesSelector = state => state.fleet.routes.items;

// ===================
// routesFullInfo:
//
// Compute and add extra info on each route model
// info shape:
// {
//   doneCount: 0,
//   undoneCount: 0,
//   finalMissionStatusTypeIds: {},
//   missionStatusTypeIds: {},      
//   advancing: 0,
//   departure: route.date,
//   eta: '1970-01-01T00:00:00.000'
// }
// ===================
export const routesFullInfo = createSelector(
  routesSelector,
  usersMapper,
  finalMissionStatusTypeInfo,
  (routes, usersMap, finalMissionStatusTypeInfo) => {
    return routes.map(route => {
      return {
        ...route,
        user: usersMap[route.user_id],
        info: computeRouteInfo(route, finalMissionStatusTypeInfo) // Shape: {advancing, departure, eta},
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
    
const computeRouteInfo = (route, finalMissionStatusTypeInfo) => {
  let actualDate = new Date();
  return route.missions.reduce((accumulator, mission) => {
    if (mission.date > accumulator.scheduledArrival) 
      accumulator.scheduledArrival = mission.date;
    
    
    // Choosed the better ETA source
    let currentEtaValue = mission.eta ? mission.eta : mission.date;
    if (currentEtaValue > accumulator.eta)
    {
      accumulator.eta = currentEtaValue;
      accumulator.advancing = computeAdvancing(actualDate, new Date(accumulator.departure), new Date(accumulator.eta));
    }
    if (finalMissionStatusTypeInfo.doneIDs.includes(mission.mission_status_type_id))
      accumulator.doneCount++;
    if (finalMissionStatusTypeInfo.undoneIDs.includes(mission.mission_status_type_id))
      accumulator.undoneCount++;
    return accumulator;
  },
  {
    doneCount: 0,
    undoneCount: 0,
    advancing: 0,
    departure: route.date,
    scheduledArrival: '1970-01-01T00:00:00.000',
    eta: '1970-01-01T00:00:00.000'
  });
};
