import { createSelector } from 'reselect';
import { usersMapper } from './userSelectors';
import { missionStatusTypesMapper } from './workflowSelectors';

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
//   advancing: 0,                    // Advancing of route computed by computeAdvancing()
//   departure: route.date,           // Route date departure
//   eta: '1970-01-01T00:00:00.000',  // Route eta (last mission eta or date if missing)
//   colorsMap: {                     // Color status infos by mission_type, shape [{color: #45678, count:4, labels: ['todo','done']}]
//     "mission": {},
//     "rest": {},
//     "departure": {},
//     "arrival": {}
//   }
// }
// ===============
export const routesFullInfo = createSelector(
  routesSelector,
  usersMapper,
  missionStatusTypesMapper,
  (routes, usersMap, missionStatusTypesMap) => {
    return routes.map(route => {
      return {
        ...route,
        user: usersMap[route.user_id],
        info: computeRouteInfo(route, missionStatusTypesMap) // Shape: {advancing, departure, eta},
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

const computeRouteInfo = (route, missionStatusTypesMap) => {
  let actualDate = new Date();
  let res = route.missions.reduce((accumulator, mission) => {
    // Find arrival date
    if (mission.date > accumulator.scheduledArrival)
      accumulator.scheduledArrival = mission.date;

    // Choosed the better ETA source
    let currentEtaValue = mission.eta ? mission.eta : mission.date;
    if (currentEtaValue > accumulator.eta) {
      accumulator.eta = currentEtaValue;
      accumulator.advancing = computeAdvancing(actualDate, new Date(route.date), new Date(accumulator.eta));
    }

    // =============
    // Specific Type
    // =============
    let missionStatusType = missionStatusTypesMap[mission.mission_status_type_id];
    if (missionStatusType) {
      let colorsMap = accumulator.colors[mission.mission_type][missionStatusType.color];
      colorsMap = colorsMap ? colorsMap : { count: 0, labels: [] };
      colorsMap.count++;
      if (!colorsMap.labels.includes(missionStatusType.label))
        colorsMap.labels.push(missionStatusType.label);
      accumulator.colors[mission.mission_type][missionStatusType.color] = colorsMap;
    }
    else {
      // TODO: USER LOGGER
      console.warn('Status type:',mission.mission_status_type_id ,' not found');
    }
    return accumulator;
  },
  {
    advancing: 0,
    scheduledArrival: '1970-01-01T00:00:00.000',
    eta: '1970-01-01T00:00:00.000',
    colors: {
      // Generate map to incress performance, (convert into array next step)
      "mission": {},
      "rest": {},
      "departure": {},
      "arrival": {}
    }
  });

  // convert maps {#45678: {count:4, labels: ['todo','done']}} to arrays => [{color: #45678, count:4, labels: ['todo','done']}]
  res.colors.mission = Object.keys(res.colors.mission).map((key) => { return { color: key, count: res.colors.mission[key].count, labels: res.colors.mission[key].labels}; });
  res.colors.rest = Object.keys(res.colors.rest).map((key) => { return { color: key, count: res.colors.rest[key].count, labels: res.colors.rest[key].labels}; });
  res.colors.departure = Object.keys(res.colors.departure).map((key) => { return { color: key, count: res.colors.departure[key].count, labels: res.colors.departure[key].labels}; });
  res.colors.arrival = Object.keys(res.colors.arrival).map((key) => { return { color: key, count: res.colors.arrival[key].count, labels: res.colors.arrival[key].labels}; });
  return res;
};
