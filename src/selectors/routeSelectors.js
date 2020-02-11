import { createSelector } from 'reselect';
import { usersMapper } from './userSelectors';
import { finalMissionStatusTypeInfo } from './workflowSelectors';

// =========
// Selectors
// =========

const routesSelector = state => state.fleet.routes.items;

// ===============
// routesFullInfo:
//
// Compute and add extra info on each route model
// info shape:
// {
//   doneCount: 0,                    // Number au mission set to XXX_done status
//   undoneCount: 0,                  // Number au mission set to XXX_undone status
//   missionStatusTypeIdsCounter: {}, // A map au mission_status_id count,
//                                       shape: {  mission_status_type_XXX: 4,
//                                                 mission_status_type_XXY: 1,
//                                                 etc...}
//   advancing: 0,                    // Advancing of route computed by computeAdvancing()
//   departure: route.date,           // Route date departure
//   eta: '1970-01-01T00:00:00.000'   // Route eta (last mission eta or date if missing)
// }
// ===============
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
    // Find arrival date
    if (mission.date > accumulator.scheduledArrival)
      accumulator.scheduledArrival = mission.date;

    // Choosed the better ETA source
    let currentEtaValue = mission.eta ? mission.eta : mission.date;
    if (currentEtaValue > accumulator.eta) {
      accumulator.eta = currentEtaValue;
      accumulator.advancing = computeAdvancing(actualDate, new Date(route.date), new Date(accumulator.eta));
    }




    // Increment number of done and undone status if necessary
    if (finalMissionStatusTypeInfo.doneIDs.includes(mission.mission_status_type_id))
      accumulator[mission.mission_type].doneCount++;
    if (finalMissionStatusTypeInfo.undoneIDs.includes(mission.mission_status_type_id))
      accumulator[mission.mission_type].undoneCount++;

    // Increment the status id
    let count = accumulator[mission.mission_type].missionStatusTypeIdsCounter[mission.mission_status_type_id] ? accumulator[mission.mission_type].missionStatusTypeIdsCounter[mission.mission_status_type_id] : 0;
    accumulator[mission.mission_type].missionStatusTypeIdsCounter[mission.mission_status_type_id] = count + 1;




    return accumulator;
  },
  {
    "mission": {
      doneCount: 0,
      undoneCount: 0,
      missionStatusTypeIdsCounter: {},
    },
    "rest": {
      doneCount: 0,
      undoneCount: 0,
      missionStatusTypeIdsCounter: {},
    },
    "departure": {
      doneCount: 0,
      undoneCount: 0,
      missionStatusTypeIdsCounter: {},
    },
    "arrival": {
      doneCount: 0,
      undoneCount: 0,
      missionStatusTypeIdsCounter: {},
    },
    advancing: 0,
    scheduledArrival: '1970-01-01T00:00:00.000',
    eta: '1970-01-01T00:00:00.000'
  });
};
