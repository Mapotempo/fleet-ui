import { ETA_TYPE } from '../constants';

// ======================
// Extra info computation
// ======================

export const initialExtraInfo = () => {
  return {
    progress: 0,
    routeArrivalDate: '1970-01-01T00:00:00.000',
    routeArrivalETA: '1970-01-01T00:00:00.000',
    finishedMissions: 0,
    finishedMissionsUndone: 0,
    finishedMissionsDelay: {
      overLowThreashold: 0,
      overHightThreashold: 0
    },
    plannedMissionsDelay: {
      overLowThreashold: 0,
      overHightThreashold: 0
    },
    'mission': {
      // {"mission_status_type_XXXX": 3, "mission_status_type_YYYY": 3}
      statusCounter: {},
      count: 0,
      done: 0
    },
    'rest': {
      statusCounter: {},
      count: 0,
      done: 0
    },
    'departure': {
      statusCounter: {},
      count: 0,
      done: 0
    },
    'arrival': {
      statusCounter: {},
      count: 0,
      done: 0
    },
    missionDelayInfoMap: {}
  };
};

// delayDateTimeWindow
// positive delay is positive if date > end
// negative if date < start 0 else
const delayDateTimeWindow = (date, timeWindow) => {
  let start = new Date(timeWindow.start);
  let end = new Date(timeWindow.end);
  date = new Date(date);
  if (date > end)
    return (date.getTime() - end.getTime()) / 1000;
  if (date < start)
    return (date.getTime() - start.getTime()) / 1000;
  return 0;
};

// getPlannedTimeWindow
// return the planned timewindow for this mission
const getPlannedTimeWindow = (mission) => {
  return mission.time_windows.find(timeWindow => delayDateTimeWindow(mission.date, timeWindow) === 0);
};

const shiftedDate = (mission, delay) => {
  let res = new Date(mission.date);
  res.setTime(res.getTime() + delay * 1000);
  return res;
};

// computeMissionDelay
// return delay for a mission with planned time windows or without time window
export const computeMissionDelayInfos = (mission, missionStatus, previousRealDelay) => {
  // plannedDate => planned time arrival by MapotempoWeb (always present)
  // sta         => shifted time arrival                 (always present)
  // eta         => estimated time arrival               (can missing)
  // rta         => real time arrival                    (can missing)
  let plannedDate = new Date(mission.date),
    sta = shiftedDate(mission, previousRealDelay),
    eta = mission.eta ? new Date(mission.eta) : null,
    rta = mission.mission_status_type_last_date ? mission.mission_status_type_last_date : null,
    delay = 0, realDelay = 0;
    // 1) - Choose arrival Date
  let arrivalDate = sta;
  let delayType = ETA_TYPE.STA;
  if (missionStatus.is_last) {
    if (rta) {
      arrivalDate = rta;
      delayType = ETA_TYPE.RTA;
    } // FIXME: else right behavior ?
  } else if (eta) {
    arrivalDate = eta;
    delayType = ETA_TYPE.CTA;
  }

  // 2) - Compute real delay
  realDelay = (new Date(arrivalDate) - plannedDate) / 1000;

  // 3) - Compute delay
  if (mission.time_windows && mission.time_windows.length) { // Delay with time windows
    let plannedTimeWindow = getPlannedTimeWindow(mission);
    if (plannedTimeWindow)
      delay = delayDateTimeWindow(arrivalDate, plannedTimeWindow);
    else // FIXME: right behavior ?
      delay = realDelay;
  } else
    delay = realDelay;
  return {delay, delayType, realDelay, arrivalDate };
};

const compareMissions = (missionA, missionB) => {
  if (missionA.date < missionB.date) return -1;
  if (missionA.date > missionB.date) return 1;
  return 0;
};

export const computeExtraInfo = (route, missionStatusTypesMap, delayLowThreashold, delayHightThreashold) => {
  let previousRealDelay = 0;

  let res = route.missions
    .sort(compareMissions)
    .reduce((extraInfo, mission) => {
      // Choosed the better ETA source
      if (mission.eta > extraInfo.routeArrivalETA)
        extraInfo.routeArrivalETA = mission.eta;

      // type extra info
      let missionTypeInfo = extraInfo[mission.mission_type];
      if (missionTypeInfo) { // FIXME: mayber log error | sentry ?
        missionTypeInfo.statusCounter[mission.mission_status_type_id] = ++missionTypeInfo.statusCounter[mission.mission_status_type_id] || 1;
        missionTypeInfo.count++;
      }

      let missionStatus = missionStatusTypesMap[mission.mission_status_type_id];
      // is last and undone
      if (missionStatus.is_last) {
        extraInfo.finishedMissions++;
        if (missionStatusTypesMap[mission.mission_status_type_id].reference.includes('undone'))
          extraInfo.finishedMissionsUndone++;
      }
      let delayInfo = computeMissionDelayInfos(mission, missionStatus, previousRealDelay);
      previousRealDelay = delayInfo.realDelay;
      extraInfo.missionDelayInfoMap[mission.id] = delayInfo;
      if (missionStatus.is_last) {
        if (delayInfo.delay > delayHightThreashold)
          extraInfo.finishedMissionsDelay.overHightThreashold++;
        else if (delayInfo.delay > delayLowThreashold)
          extraInfo.finishedMissionsDelay.overLowThreashold++;
      }
      else {
        if (delayInfo.delay > delayHightThreashold)
          extraInfo.plannedMissionsDelay.overHightThreashold++;
        else if (delayInfo.delay > delayLowThreashold)
          extraInfo.plannedMissionsDelay.overLowThreashold++;
      }
      return extraInfo;
    }, initialExtraInfo());

  if (route.missions.length)
    res.progress = Math.floor((res.finishedMissions / route.missions.length) * 100);

  return res;
};
