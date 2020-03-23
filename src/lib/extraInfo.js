// ======================
// Extra info computation
// ======================

export const initialExtraInfo = () => {
  return {
    advancing: 0,
    scheduledArrival: 0,
    eta: '1970-01-01T00:00:00.000',
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
    missionsDelay: 0,
    missionsDelayOverXX: 0,
    delay: 0

  };
};

const computeAdvancing = (actualDate, departureDate, eta) => {
  if (actualDate > eta)
    return 100;
  else if (actualDate > departureDate)
    return Math.round(((actualDate - departureDate) / (eta - departureDate)) * 100);
  else
    return 0;
};

// Pour la prise en compte d'un retard
//  -> si créneaux horaires, t'en que l'eta est dans le crénaux horaire (si pas d'eta ??)
//  -> si pas de créneaux horaire, eta par rapport à un temps définis par l'utilisateur (5min par default) (si pas d'eta ??)


// 4:10
// qu'en pensais vous ? et que proposez vous si il n'y a pas d'eta (j'ai oublié de poser la question)
// const computeMissionDelay = (mission, missionStatusTypesMap) => {
//   // time_windows shape {end: iso_date, start: iso_date}
//   let missionStatusType = missionStatusTypesMap[mission.mission_status_type_id];
//   if (!missionStatusType)
//     console.warn('MissionStatusTypeId not found', missionStatusType);

//   if (!missionStatusType)
//     missionStatusType.is_last && mission.mission_status_type_last_date;


//   if (mission.time_windows && mission.time_windows.length)
//   {

//   }
// };

export const computeExtraInfo = (route, missionStatusTypesMap) => {
  let actualDate = new Date();
  let res = route.missions.reduce((extraInfo, mission) => {
    // Find arrival date
    if (mission.date > extraInfo.scheduledArrival)
      extraInfo.scheduledArrival = mission.date;

    // Choosed the better ETA source
    let currentEtaValue = mission.eta ? mission.eta : mission.date;
    if (currentEtaValue > extraInfo.eta) {
      extraInfo.eta = currentEtaValue;
      extraInfo.advancing = computeAdvancing(actualDate, new Date(route.date), new Date(extraInfo.eta));
    }

    // type extra info
    mission.mission_status_type_id;
    let missionTypeInfo = extraInfo[mission.mission_type];
    if (missionTypeInfo) { // FIXME: mayber log error | sentry ?
      missionTypeInfo.statusCounter[mission.mission_status_type_id] = ++missionTypeInfo.statusCounter[mission.mission_status_type_id] || 1;
      missionTypeInfo.count++;
    }

    // Compute delay


    return extraInfo;
  }, initialExtraInfo());
  // FIXME: Fake
  res.delay = Math.floor(Math.random() * 60);
  return res;
};
