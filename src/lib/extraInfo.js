// ======================
// Extra info computation
// ======================

const DELAY_LOW_THREASHOLD = 10; //min
const DELAY_HIGHT_THREASHOLD = 30; //min

export const initialExtraInfo = () => {
  return {
    advancing: 0,
    scheduledArrival: 0,
    eta: '1970-01-01T00:00:00.000',
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
    }
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

// computeMissionDelay
// return delay for a mission with planned time windows or without time window
// FIXME: when plannedTimeWindow is not found return 0 (should be switch on classic mode ?)
export const computeMissionDelay = (mission, missionStatus) => {
  let arrivalDate = mission.eta;
  if (missionStatus.is_last)
    arrivalDate = mission.mission_status_type_last_date;
  if (!arrivalDate) // Unpredictable delay return 0
    return 0;

  if (mission.time_windows && mission.time_windows.length) { // Delay with time windows
    let plannedTimeWindow = getPlannedTimeWindow(mission);
    if (!plannedTimeWindow)
      return 0;
    return delayDateTimeWindow(arrivalDate, plannedTimeWindow);
  }
  else { // Delay without time window
    return (new Date(arrivalDate) - new Date(mission.date)) / 1000;
  }
};

//
export const computeExtraInfo = (route, missionStatusTypesMap) => {
  let res = route.missions.reduce((extraInfo, mission) => {
    // Find arrival date
    if (mission.date > extraInfo.scheduledArrival) {
      extraInfo.scheduledArrival = mission.date;
    }

    // Choosed the better ETA source
    let currentEtaValue = mission.eta ? mission.eta : mission.date;
    if (currentEtaValue > extraInfo.eta) {
      extraInfo.eta = currentEtaValue;
    }

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
    let delay = computeMissionDelay(mission, missionStatus);
    if (missionStatus.is_last)
      if (delay > DELAY_HIGHT_THREASHOLD)
        extraInfo.finishedMissionsDelay.overHightThreashold++;
      else if (delay > DELAY_LOW_THREASHOLD)
        extraInfo.finishedMissionsDelay.overLowThreashold++;
      else
      if (delay > DELAY_HIGHT_THREASHOLD)
        extraInfo.plannedMissionsDelay.overHightThreashold++;
      else if (delay > DELAY_LOW_THREASHOLD)
        extraInfo.plannedMissionsDelay.overLowThreashold++;
    return extraInfo;
  }, initialExtraInfo());

  if (route.missions.length)
    res.advancing = Math.floor((res.finishedMissions / route.missions.length) * 100);

  return res;
};
