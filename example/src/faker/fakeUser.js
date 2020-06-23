import { dateToLocalISO, getRandomUUID, getRandomInt } from './fakeUtils';
import { sha256 } from 'fleet-ui';
import faker from 'Faker';

export const generateUser = (companyId, vehicle = true, email=faker.Internet.email(), apiKey = getRandomUUID(16)) => {
  return {
    "id": 'user-' + getRandomUUID(10),
    "company_id": companyId,
    "api_key": apiKey,
    "sync_user": sha256(email),
    "name": faker.Name.findName(),
    "email": email,
    "vehicle": vehicle,
    "color": '#c5b7d1',
    "phone": "0607070707",
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

const getDeviceRandomInfo = () => {
  const versions = ["8.1.0", "4.1.2", "4.1.2"];
  const manufacturers = ["CROSSCALL", "Samsung", "Nexus"];
  const models = {
    "CROSSCALL": ["Core-X3"],
    "Samsung": ["Galaxy A71", "S20", "A51"],
    "Nexus": ["xperia z5", "xperia z3"]
  };
  let manufacturer = manufacturers[getRandomInt(0, manufacturers.length)];
  return {
    os: "android",
    version: versions[getRandomInt(0, manufacturers.length)],
    manufacturer: manufacturer,
    model: models[manufacturer][getRandomInt(0, models[manufacturer].length)]
  };
};


const generateUserInfo = (companyId, user) => {
  let randomInfo  = getDeviceRandomInfo();
  return {
    "id": 'user-info-' + getRandomUUID(10),
    "company_id": companyId,
    "user_id": user.id,
    "sync_user": user.sync_user,
    "current_app_version": "5.0.10",
    "current_lib_version": "6",
    "current_sign_in_connexion_type": "wifi",
    "date": "2020-05-26T14:21:55.925+02:00",
    "device_info": {
      "os": randomInfo.os,
      "os_version": randomInfo.version,
      "api_lvl": "27",
      "device_id": getRandomUUID(16),
      "manufacturer": randomInfo.manufacturer,
      "model": randomInfo.model
    },
    "last_sign_in_at": dateToLocalISO(new Date()),
    "last_sign_in_ip": "",
    "location_detail": {
      "accuracy": 86.832,
      "altitude": 62.6022,
      "bearing": 0,
      "cid": -1,
      "date": dateToLocalISO(new Date()),
      "lac": -1,
      "lat": 44.79669733,
      "lon": -0.5723686,
      "mcc": -1,
      "mnc": -1,
      "signal_strength": 0,
      "speed": 0
    },
    "sign_in_count": 5,
    "time_zone": "Europe/Paris",
    "type": "user_info"
  };
};

export const generateUserInfos = (companyId, user) => {
  let userInfos = [];
  for (let i = 0; i < getRandomInt(0, 6); i++) {
    userInfos.push(generateUserInfo(companyId, user));
  }
  return userInfos;
};


export const generateUserSettings = (companyId, user) => {
  return {
    "id": 'user-setting-' + getRandomUUID(10),
    "company_id": companyId,
    "user_id": user.id,
    "sync_user": user.sync_user,
    "data_connection": (getRandomInt(0, 2) % 2) === 1,
    "tracking_enable": (getRandomInt(0, 2) % 2) === 1,
    "use_shortcut_next_mission": (getRandomInt(0, 2) % 2) === 1,
    "automatic_archive": (getRandomInt(0, 2) % 2) === 1,
    "permission_accepted": (getRandomInt(0, 2) % 2) === 1,
    "night_mode": (getRandomInt(0, 2) % 2) === 1
  };
};
