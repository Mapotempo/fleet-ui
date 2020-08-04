import { createSelector } from 'reselect';
// import createCachedSelector from 're-reselect';
import { missionStatusTypesMapper } from './workflowSelectors';

// =========
// Selectors
// =========
export const routesSelector = state => state.fleet.routes.items;

export const missionsDowloadProgressSelector = createSelector(
  routesSelector,
  routes => routes.length ? (routes.filter(route => route.missions.length > 0).length / routes.length) * 100 : 100
);

export const globalRoutesInfoSelector = createSelector(
  routesSelector,
  missionStatusTypesMapper,
  (routes) => (routes.reduce((accumulator, route) => {
    // Count
    if (route.extraInfo.progress > 99.9)
      accumulator.globalFinishedRoutes++;
    accumulator.globalMissions += route.missions.length;
    accumulator.globalFinishedMissions += route.extraInfo.finishedMissions;
    accumulator.globalFinishedMissionsUndone += route.extraInfo.finishedMissionsUndone;

    accumulator.globalMissionDelays.planned += route.extraInfo.plannedMissionsDelay.overHightThreashold + route.extraInfo.plannedMissionsDelay.overLowThreashold;
    accumulator.globalMissionDelays.finished += route.extraInfo.finishedMissionsDelay.overHightThreashold + route.extraInfo.finishedMissionsDelay.overLowThreashold;

    // Distance
    accumulator.globalDistancePlanned += route.distance;

    return accumulator;
  }, {
    globalFinishedRoutes: 0,
    globalMissions: 0,
    globalFinishedMissions: 0,
    globalFinishedMissionsUndone: 0,
    globalMissionDelays: {
      finished: 0,
      planned: 0
    },
    globalDistancePlanned: 0,
    globalDistanceReal: 0
  })
  )
);
