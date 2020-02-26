import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import { missionStatusTypesMapper } from './workflowSelectors';

// =========
// Selectors
// =========
export const routesSelector = state => state.fleet.routes.items;

export const missionsDowloadProgressSelector = createSelector(
  routesSelector,
  routes => (routes.filter(route => route.missions.length > 0).length / routes.length) * 100
);

// ==================
// routeInfoSelector:
//
// Compute and Cached extra information of route
// ps: use re-reselec to cache informations
// -> https://github.com/toomuchdesign/re-reselect
// ==================
export const routeInfoSelector = createCachedSelector(
  missionStatusTypesMapper,
  (state, routeId) => routesSelector(state).find((route) => route.id === routeId),
  (missionStatusTypesMap, route) => computeRouteInfo(route, missionStatusTypesMap)
)(
  (state, routeId) => routeId
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
      // Color process
      let typeInfo = accumulator[mission.mission_type];
      let colorsMap = typeInfo.colors[missionStatusType.color] || { count: 0, labels: [] };
      colorsMap.count++;
      if (!colorsMap.labels.includes(missionStatusType.label))
        colorsMap.labels.push(missionStatusType.label);
      typeInfo.colors[missionStatusType.color] = colorsMap;

      // Map type process
      let info = typeInfo.missionStatusTypeCountByIds[missionStatusType.reference] || { label: '', count: 0, color: '' };
      info.label = missionStatusType.label; // Last found
      info.color = missionStatusType.color; // Last found
      info.count++;
      typeInfo.missionStatusTypeCountByIds[missionStatusType.reference] = info;
    }
    else {
      // TODO: USE LOGGER
      console.warn('Status type:', mission.mission_status_type_id, ' not found');
    }
    return accumulator;
  },
  {
    advancing: 0,
    scheduledArrival: '1970-01-01T00:00:00.000',
    eta: '1970-01-01T00:00:00.000',
    // Generate map to incress performance, (convert into array next step)
    "mission": {
      colors: {},
      missionStatusTypeCountByIds: {}
    },
    "rest": {
      colors: {},
      missionStatusTypeCountByIds: {}
    },
    "departure": {
      colors: {},
      missionStatusTypeCountByIds: {}
    },
    "arrival": {
      colors: {},
      missionStatusTypeCountByIds: {}
    },
    delay: Math.floor(Math.random() * 60)
  });

  // convert maps {#45678: {count:4, labels: ['todo','done']}} to arrays => [{color: #45678, count:4, labels: ['todo','done']}]
  res.mission.colors = colorMapToArray(res.mission.colors);
  res.rest.colors = colorMapToArray(res.rest.colors);
  res.departure.colors = colorMapToArray(res.departure.colors);
  res.arrival.colors = colorMapToArray(res.arrival.colors);

  res.mission.missionStatusTypeCountByIds = missionStatusTypeCountByIdsMapToArray(res.mission.missionStatusTypeCountByIds);
  res.rest.missionStatusTypeCountByIds = missionStatusTypeCountByIdsMapToArray(res.rest.missionStatusTypeCountByIds);
  res.departure.missionStatusTypeCountByIds = missionStatusTypeCountByIdsMapToArray(res.departure.missionStatusTypeCountByIds);
  res.arrival.missionStatusTypeCountByIds = missionStatusTypeCountByIdsMapToArray(res.arrival.missionStatusTypeCountByIds);

  return res;
};

const colorMapToArray = (colorMap) => {
  return Object.keys(colorMap).map(key => { return { color: key, count: colorMap[key].count, labels: colorMap[key].labels}; });
};
const missionStatusTypeCountByIdsMapToArray = (missionStatusTypeCountByIdsMap) => {
  return Object.keys(missionStatusTypeCountByIdsMap).map(key => { return { reference: key, ...missionStatusTypeCountByIdsMap[key] };});
};
