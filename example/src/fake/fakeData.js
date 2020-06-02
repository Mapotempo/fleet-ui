import faker from 'Faker';
import { sha256 } from 'fleet-ui';

const MAX_MISSION = 50;
const LASTIFY_THREASHOLD = 96;

const generateCompanyData = (companyId, email, apiKey) =>
{
  let today = new Date();
  let users = [generateUser(companyId, false, email, apiKey), generateUser(companyId), generateUser(companyId), generateUser(companyId), generateUser(companyId), generateUser(companyId)];
  let workflow = {
    missionActionTypes: generateMissionActionsType(companyId),
    missionStatusTypes: generateMissionStatusType(companyId)
  };
  let routes = users.filter(user => user.vehicle).map(user => generateRoute(user, today, workflow));
  return {
    users: users,
    workflow: workflow,
    routes: routes
  };
};

const generateMissionStatusType = (companyId) => {
  return [
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'mission_undone',
      color: '#D9534F',
      label: 'Non fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'departure_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'departure_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'departure_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'arrival_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'arrival_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'arrival_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + getRandomUUID(11),
      company_id: companyId,
      reference: 'rest_undone',
      color: '#D9534F',
      label: 'Non fait',
      is_last: true
    }
  ];
};

const generateMissionActionsType = (companyId) => {
  return [
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      next_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      next_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295kE_ETj',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kE_ETj',
      next_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      next_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296l-xuls',
      next_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296l-xuls',
      next_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      next_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      next_mission_status_type_id: 'mission_status_type-18296l-xuls',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      next_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      next_mission_status_type_id: 'mission_status_type-18296l-xuls',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      next_mission_status_type_id: 'mission_status_type-18297m00jVD',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      next_mission_status_type_id: 'mission_status_type-18297m1TPft',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m00jVD',
      next_mission_status_type_id: 'mission_status_type-18297m1TPft',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m00jVD',
      next_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m1TPft',
      next_mission_status_type_id: 'mission_status_type-18297m00jVD',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m1TPft',
      next_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298YwfgND',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      next_mission_status_type_id: 'mission_status_type-18298YqMmle',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      next_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      next_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + getRandomUUID(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YwfgND',
      next_mission_status_type_id: 'mission_status_type-18298YqMmle',
      group: null,
      label: null
    }
  ];
};

const generateUser = (companyId, vehicle = true, email=faker.Internet.email(), apiKey = getRandomUUID(16)) => {
  return {
    "id": 'user-' + getRandomUUID(10),
    "company_id": companyId,
    "api_key": apiKey,
    "sync_user": sha256(email),
    "name": faker.Name.findName(),
    "email": email,
    "vehicle": vehicle,
    "color": '#c5b7d1',
    "phone": null,
    "roles": [
      'route.updating',
      'mission.updating',
      'mission_action.creating',
      'mission_action.updating',
      'user_settings.creating',
      'user_settings.updating',
      'user_current_location.creating',
      'user_current_location.updating',
      'route_track.creating',
      'route_track.updating'
    ]
  };
};

// const generateUserInfo = (companyId, userId, date) => {
//   return {
//     "company_id": companyId,
//     "user_id": userId,
//     "current_app_version": "5.0.10",
//     "current_lib_version": "6",
//     "current_sign_in_connexion_type": "wifi",
//     "date": "2020-05-26T14:21:55.925+02:00",
//     "device_info": {
//       "android_ver": "8.1.0",
//       "api_lvl": "27",
//       "device_id": "bd00ba34f98ab1a3",
//       "manufacturer": "CROSSCALL",
//       "model": "Core-X3"
//     },
//     "last_sign_in_at": dateToLocalISO(date),
//     "last_sign_in_ip": "",
//     "location_detail": {
//       "accuracy": 86.832,
//       "altitude": 62.6022,
//       "bearing": 0,
//       "cid": -1,
//       "date": dateToLocalISO(date),
//       "lac": -1,
//       "lat": 44.79669733,
//       "lon": -0.5723686,
//       "mcc": -1,
//       "mnc": -1,
//       "signal_strength": 0,
//       "speed": 0
//     },
//     "sign_in_count": 5,
//     "time_zone": "Europe/Paris",
//     "type": "user_info"
//   };
// };

const generateRoute = (user, date, workflow) => {
  let routeId = 'route-' + getRandomUUID(11);
  let missions = generateMissionSet(routeId, user, date, workflow);
  let duration = computeDuration(missions);
  return {
    "id": routeId,
    "external_ref": 'route-' + (1000000+Math.round(Math.random()*1000000)) + '-' + date.getFullYear() + '_' + (date.getMonth() + 1) + '_' + date.getUTCDate(),
    "name": faker.random.br_state(),
    "user_id": user.id,
    "user_email": user.email,
    "sync_user": user.sync_user,
    "duration": duration,
    "distance": 29147,
    "missions_count": missions.length,
    "missions": missions
  };
};

const generateMissionSet = (routeId, user, date, workflow) => {
  date = new Date(date);
  let eta = new Date(date);
  let departureMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("departure"));
  let missionMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("mission"));
  // let restMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("rest"));
  let arrivalMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("arrival"));

  let setSize = Math.floor(Math.random() * MAX_MISSION) + 1;
  let res = [];
  let isLast = lastify(true);
  let isInProgress = isLast;
  // 1 - Generate Departure
  res.push(generateMission(routeId, user, date, eta, 'departure', getRandomStatus(departureMissionStatusTypes, isLast, isInProgress)));
  // 2 - Generate Missions
  for (let i = 0; i < setSize; i++) {
    date.setTime(date.getTime() + Math.random() * 3600000); // Incress date
    eta.setTime(date.getTime() + getRandomInt(-15 * 60 * 1000, 30 * 15 * 1000)); // Incress eta
    isLast = lastify(isLast);                               // randomly lastify next mission
    res.push(generateMission(routeId,                       // Generate and push new mission
      user,
      date,
      eta,
      'mission',
      getRandomStatus(missionMissionStatusTypes,
        isLast,
        isInProgress)));
    isInProgress = isLast;                                   // Set isInProgres compared to isLast
  }
  // 3 - Generate Arrival
  isLast = lastify(isLast);
  date.setTime(date.getTime() + Math.random() * 3600000); // Incress date
  eta.setTime(date.getTime() + getRandomInt(-30 * 60 * 1000, 30 * 60 * 1000)); // Incress eta
  res.push(generateMission(routeId, user, date, eta, 'arrival', getRandomStatus(arrivalMissionStatusTypes, isLast, isInProgress)));
  return res;
};

const generateMission = (routeid, user, date, eta, mission_type, missionStatusType) => {
  mission_type = ['mission', 'departure', 'arrival', 'rest'].includes(mission_type) ? mission_type : 'mission';
  let mission_status_type_last_date = !missionStatusType.reference.includes('todo')  ? generateMissionStatusTypeLastDate(eta, missionStatusType.reference) : null;
  return    {
    "id": 'mission-' + getRandomUUID(10),
    "company_id": user.company_id,
    "route_id": routeid,
    "user_id": user.id,
    "mission_status_type_id": missionStatusType.id,
    "mission_status_type_last_date": mission_status_type_last_date,
    "status_type_reference": missionStatusType.reference,
    "status_type_label": missionStatusType.label,
    "status_type_color": missionStatusType.color,
    "sync_user": user.sync_user,
    "mission_type": mission_type,
    "external_ref": mission_type + '-4025-2020_03_18-2286795',
    "name": mission_type === 'mission' ? faker.Name.findName : mission_type,
    "date": dateToLocalISO(date),
    "eta": dateToLocalISO(eta),
    "eta_computed_at": null,
    "eta_computed_mode": null,
    "location": {
      "lat": 44.83423,
      "lon": -0.60068
    },
    "address": {
      "city": 'Bordeaux',
      "country": 'France',
      "postalcode": null,
      "state": null,
      "street": null
    },
    "comment": null,
    "phone": faker.PhoneNumber.phoneNumber(),
    "reference": null,
    "duration": null,
    "quantities": null,
    "tags": null,
    "time_windows": [] // generateTimeWindows(date, mission_type)
  };
};

// ========================
// Library
// ========================

const computeDuration = (missions) => {
  if (missions.length > 0) // we presupposed missions are ordered by day
  {
    return (new Date(missions[missions.length - 1].date) - new Date(missions[0].date)) / 1000;
  }
  return 0;
};

const generateMissionStatusTypeLastDate = (missionDate, statusRef) => {
  return statusRef.includes('to_do') ? undefined : dateToLocalISO(new Date(missionDate.getTime() + getRandomInt(-15 * 60 * 1000, 15 * 60 * 1000)));
};

// TODO:
// const generateTimeWindows = (missionDate, missionType) => {
//   if (missionType !== 'mission')
//     return [];
//   let timeWindow  = new Date(missionDate);
//   timeWindow.setMilliseconds(0);
//   timeWindow.setSeconds(0);
//   timeWindow.setMinutes(0);
//   const windows = [15,30,60];
//   let randWindows = windows[Math.floor(Math.random() * windows.length)];
//   return [
//     {
//       start: dateToLocalISO(new Date(timeWindow.getTime() - randWindows * 60 * 1000)),
//       end: dateToLocalISO(new Date(timeWindow.getTime() + randWindows * 60 * 1000)),
//     }
//   ];
// };

const lastify = (isLast) => {
  if (!isLast)
    return false;
  return Math.floor(Math.random() * 100) > LASTIFY_THREASHOLD ? false : true;
};

const getRandomStatus = (missionStatusTypes, isLast, isInProgress) => {
  missionStatusTypes = missionStatusTypes.filter(missionStatusType =>(missionStatusType.is_last || false) === isLast);
  if (!isLast)
    missionStatusTypes = missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes('in_progress') === isInProgress);
  return missionStatusTypes[Math.floor(Math.random() * missionStatusTypes.length)];
};

const getRandomUUID = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const dateToLocalISO = (date) => {
  const off    = date.getTimezoneOffset();
  const absoff = Math.abs(off);
  return (new Date(date.getTime() - off*60*1000).toISOString().substr(0,23) +
          (off > 0 ? '-' : '+') +
          (absoff / 60).toFixed(0).padStart(2,'0') + ':' +
          (absoff % 60).toString().padStart(2,'0'));
};

export const generateFakeData = () => { return {
  "abcdef123456": generateCompanyData('company-abcdef', 'jm.fillau@gmail.com', 'abcdef123456'),
  "abcdef654321": generateCompanyData('company-dk789', 'jean-maxime@mapotempo.com', 'abcdef654321'),
  "nbvcxxw": generateCompanyData('company-abcdef', 'm.fillau@laposte.net', 'nbvcxxw'),
};};
