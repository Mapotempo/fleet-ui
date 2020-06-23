import {
  generateMissionStatusTypeLastDate, getRandomInt, getRandomUUID,
  getRandomStatus, computeDuration, lastify, dateToLocalISO
} from './fakeUtils';
import faker from 'Faker';

const MAX_MISSION = 50;
const LASTIFY_THREASHOLD = 96;

export const generateRoute = (user, date, workflow) => {
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
  let isLast = lastify(true, LASTIFY_THREASHOLD);
  let isInProgress = isLast;
  // 1 - Generate Departure
  res.push(generateMission(routeId, user, date, eta, 'departure', getRandomStatus(departureMissionStatusTypes, isLast, isInProgress)));
  // 2 - Generate Missions
  for (let i = 0; i < setSize; i++) {
    date.setTime(date.getTime() + Math.random() * 3600000); // Incress date
    eta.setTime(date.getTime() + getRandomInt(-15 * 60 * 1000, 30 * 15 * 1000)); // Incress eta
    isLast = lastify(isLast, LASTIFY_THREASHOLD);                               // randomly lastify next mission
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
  isLast = lastify(isLast, LASTIFY_THREASHOLD);
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
    "name": mission_type === 'mission' ? faker.Name.findName() : mission_type,
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
    "time_windows": [], // generateTimeWindows(date, mission_type),
    "survey_pictures": [`https://avatars3.githubusercontent.com/u/${getRandomInt(0, 20000000)}`]
  };
};
