import { dateToLocalISO, getRandomUUID } from './fakeUtils';
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


export const generateUserInfo = (companyId, user) => {
  return [{
    "company_id": companyId,
    "user_id": user.id,
    "sync_user": user.sync_user,
    "current_app_version": "5.0.10",
    "current_lib_version": "6",
    "current_sign_in_connexion_type": "wifi",
    "date": "2020-05-26T14:21:55.925+02:00",
    "device_info": {
      "android_ver": "8.1.0",
      "api_lvl": "27",
      "device_id": "bd00ba34f98ab1a3",
      "manufacturer": "CROSSCALL",
      "model": "Core-X3"
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
  },{
    "company_id": companyId,
    "user_id": user.id,
    "sync_user": user.sync_user,
    "current_app_version": "5.0.10",
    "current_lib_version": "6",
    "current_sign_in_connexion_type": "wifi",
    "date": "2020-05-26T14:21:55.925+02:00",
    "device_info": {
      "android_ver": "8.1.0",
      "api_lvl": "27",
      "device_id": "bd00ba34f98ab1a3",
      "manufacturer": "CROSSCALL",
      "model": "Core-X3"
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
  }
  ];
};
