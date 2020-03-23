import faker from 'Faker';
import sha256 from 'js-sha256';

const generateCompanyData = (companyId, email, apiKey) =>
{
  let today = new Date();
  let users = [generateUser(companyId, false, email, apiKey), generateUser(companyId)];
  let workflow = {
    missionActionTypes: generateMissionActionsType('XXX'),
    missionStatusTypes: generateMissionStatusType('XXX')
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
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'mission_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'mission_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'mission_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'mission_undone',
      color: '#D9534F',
      label: 'Non fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'departure_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'departure_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'departure_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'arrival_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'arrival_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'arrival_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'rest_to_do',
      color: '#337AB7',
      label: 'À faire',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'rest_in_progress',
      color: '#F0AD4E',
      label: 'En cours',
      is_last: null
    },
    {
      id: 'mission_status_type-' + makeid(11),
      company_id: companyId,
      reference: 'rest_done',
      color: '#5CB85C',
      label: 'Fait',
      is_last: true
    },
    {
      id: 'mission_status_type-' + makeid(11),
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
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      next_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      next_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295kE_ETj',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      next_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kE_ETj',
      next_mission_status_type_id: 'mission_status_type-18295kBqJbI',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18295kGqkwB',
      next_mission_status_type_id: 'mission_status_type-18295k6uE1T',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296l-xuls',
      next_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296l-xuls',
      next_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      next_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      next_mission_status_type_id: 'mission_status_type-18296l-xuls',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      next_mission_status_type_id: 'mission_status_type-18296m0sLZT',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18296m2oFv6',
      next_mission_status_type_id: 'mission_status_type-18296l-xuls',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      next_mission_status_type_id: 'mission_status_type-18297m00jVD',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      next_mission_status_type_id: 'mission_status_type-18297m1TPft',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m00jVD',
      next_mission_status_type_id: 'mission_status_type-18297m1TPft',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m00jVD',
      next_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m1TPft',
      next_mission_status_type_id: 'mission_status_type-18297m00jVD',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18297m1TPft',
      next_mission_status_type_id: 'mission_status_type-18297l-IA3U',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YqMmle',
      next_mission_status_type_id: 'mission_status_type-18298YwfgND',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      next_mission_status_type_id: 'mission_status_type-18298YqMmle',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      next_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298Yucxa3',
      next_mission_status_type_id: 'mission_status_type-18298Ysb3jX',
      group: null,
      label: null
    },
    {
      id: 'mission_action_type-' + makeid(11),
      company_id: companyId,
      previous_mission_status_type_id: 'mission_status_type-18298YwfgND',
      next_mission_status_type_id: 'mission_status_type-18298YqMmle',
      group: null,
      label: null
    }
  ];
};

const generateUser = (companyId, vehicle = true, email=faker.Internet.email(), apiKey = makeid(16)) => {
  return {
    "id": 'user-' + makeid(10),
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

const generateRoute = (user, date, workflow) => {
  let routeId = 'route-' + makeid(11);
  let missions = generateMissionSet(routeId, user, date, workflow);
  let duration = missions.length > 0 ? 1000 : 0; // TODO:
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
  let departureMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("departure"));
  let missionMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("mission"));
  // let restMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("rest"));
  let arrivalMissionStatusTypes = workflow.missionStatusTypes.filter(missionStatusType => missionStatusType.reference.includes("arrival"));

  let setSize = Math.floor(Math.random() * 150) + 1;
  let res = [];
  let isLast = lastify(false);
  res.push(generateMission(routeId, user, date, 'departure', getRandomStatus(departureMissionStatusTypes, isLast)));
  for (let i = 0; i < setSize; i++) {
    res.push(generateMission(routeId, user, date, 'mission', getRandomStatus(missionMissionStatusTypes, isLast)));
  }
  res.push(generateMission(routeId, user, date, 'arrival', getRandomStatus(arrivalMissionStatusTypes, isLast)));
  return res;
};

const generateMission = (routeid, user, date, mission_type, missionStatusType) => {
  mission_type = ['mission', 'departure', 'arrival', 'rest'].includes(mission_type) ? mission_type : 'mission';
  return    {
    "id": 'mission-' + makeid(10),
    "company_id": user.company_id,
    "route_id": routeid,
    "user_id": user.id,
    "mission_status_type_id": missionStatusType.id,
    "sync_user": user.sync_user,
    "mission_type": mission_type,
    "external_ref": mission_type + '-4025-2020_03_18-2286795',
    "name": mission_type === 'mission' ? faker.Name.findName : mission_type,
    "date": '2020-03-18T20:02:22.000+01:00',
    "eta": null,
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
    "time_windows": null,
    "status_type_reference": 'departure_done',
    "status_type_label": 'Fait',
    "status_type_color": '#5CB85C',
    "quantities": null,
    "tags": null
  };
};

const lastify = (isLast) => {
  if (isLast)
    return true;
  return Math.floor(Math.random() * 100) > 70 ? true : false;
};

const getRandomStatus = (missionStatusTypes, is_last) => {
  missionStatusTypes = missionStatusTypes.filter(missionStatusType =>(missionStatusType.is_last || false) == is_last);
  return missionStatusTypes[Math.floor(Math.random() * missionStatusTypes.length)];
};

const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const dataSet = {
  "abcdef123456": generateCompanyData('company-abcdef', 'jm.fillau@gmail.com', 'abcdef123456'),
  "ghijkl": generateCompanyData('company-abcdef', 'ghijkl'),
  "mnopqr": generateCompanyData('company-abcdef', 'mnopqr')
};

export const routeTemplate = {
  id: 'route-19mVSxaALFR',
  external_ref: 'route-2286795-2020_03_18',
  name: 'P372617101',
  user_id: 'user-fIxc7jcZYs',
  sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
  date: '2020-03-18T20:02:22.000+01:00',
  missions_count: 7,
  duration: 4471,
  distance: 29147,
  missions: [
    {
      id: 'mission-19mVSc8CLKB',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18296m2oFv6',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'departure',
      external_ref: 'departure-4025-2020_03_18-2286795',
      name: 'Départ véhicule',
      date: '2020-03-18T20:02:22.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: 44.83423,
        lon: -0.60068
      },
      address: {
        city: 'Bordeaux',
        country: 'France',
        postalcode: null,
        state: null,
        street: null
      },
      comment: null,
      phone: null,
      reference: null,
      duration: null,
      time_windows: null,
      status_type_reference: 'departure_done',
      status_type_label: 'Fait',
      status_type_color: '#5CB85C',
      quantities: null,
      tags: null
    },
    {
      id: 'mission-19mVScA1vbV',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18298Yucxa3',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'rest',
      external_ref: 'mission-r24498769-2020_03_18-2286795',
      name: 'Pause',
      date: '2020-03-18T20:02:22.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: null,
        lon: null
      },
      address: {
        city: null,
        country: 'France',
        detail: null,
        postalcode: null,
        state: null,
        street: null
      },
      comment: null,
      phone: null,
      reference: null,
      duration: 600,
      time_windows: null,
      status_type_reference: 'rest_done',
      status_type_label: 'Fait',
      status_type_color: '#5CB85C',
      quantities: null,
      tags: null
    },
    {
      id: 'mission-19mVScHV0nG',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18295kGqkwB',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'mission',
      external_ref: 'mission-v14058943-2020_03_18-2286795',
      name: 'Client 3',
      date: '2020-03-18T20:30:00.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: 44.824587,
        lon: -0.673642
      },
      address: {
        city: 'Mérignac',
        country: 'France',
        detail: null,
        postalcode: '33700',
        state: null,
        street: '2 Rue Miguel de Cervantès'
      },
      comment: '',
      phone: null,
      reference: null,
      duration: 0,
      time_windows: [
        {
          end: '2020-03-18T11:00:00.000+01:00',
          start: '2020-03-18T10:00:00.000+01:00'
        },
        {
          end: '2020-03-18T20:30:00.000+01:00',
          start: '2020-03-18T20:00:00.000+01:00'
        }
      ],
      status_type_reference: 'mission_undone',
      status_type_label: 'Non fait',
      status_type_color: '#D9534F',
      quantities: [
        {
          codes: [],
          deliverable_unit_id: 3694,
          label: '50LSANI_COL',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3695,
          label: '50LSANI_DEP',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3696,
          label: 'ALVAMPO_COL',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3697,
          label: 'ALVAMPO_DEP',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3698,
          label: 'B10LR_COL',
          quantity: null,
          quantity_formatted: '\u202fB10LR_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3699,
          label: 'B10LR_DEP',
          quantity: null,
          quantity_formatted: '\u202fB10LR_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3700,
          label: 'BA10LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3701,
          label: 'BA10LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3702,
          label: 'BA170_COL',
          quantity: null,
          quantity_formatted: '\u202fBA170_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3703,
          label: 'BA170_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA170_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3704,
          label: 'BA18LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3705,
          label: 'BA18LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3706,
          label: 'BA1LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3707,
          label: 'BA1LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3708,
          label: 'BA250ML_COL',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3709,
          label: 'BA250ML_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3710,
          label: 'BA3LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA3LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3138,
          label: 'brique',
          quantity: 10,
          quantity_formatted: '10\u202fbrique',
          unit_icon: 'fa-cube'
        },
        {
          codes: [],
          deliverable_unit_id: 3711,
          label: 'Centre Presse',
          quantity: null,
          quantity_formatted: '\u202fCentre Presse',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3712,
          label: 'ELLE',
          quantity: null,
          quantity_formatted: '\u202fELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3713,
          label: 'FEMME ACTUELLE',
          quantity: null,
          quantity_formatted: '\u202fFEMME ACTUELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3714,
          label: 'FIGARO',
          quantity: null,
          quantity_formatted: '\u202fFIGARO',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3715,
          label: 'FRANCE FOOTBALL',
          quantity: null,
          quantity_formatted: '\u202fFRANCE FOOTBALL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3716,
          label: 'INVESTIR',
          quantity: null,
          quantity_formatted: '\u202fINVESTIR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3717,
          label: 'LA CROIX',
          quantity: null,
          quantity_formatted: '\u202fLA CROIX',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3718,
          label: 'La Nouvelle République',
          quantity: null,
          quantity_formatted: '\u202fLa Nouvelle République',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3719,
          label: 'Le Monde',
          quantity: null,
          quantity_formatted: '\u202fLe Monde',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3720,
          label: 'LE PELERIN',
          quantity: null,
          quantity_formatted: '\u202fLE PELERIN',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3721,
          label: 'LE POINT',
          quantity: null,
          quantity_formatted: '\u202fLE POINT',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3722,
          label: 'LES ECHOS',
          quantity: null,
          quantity_formatted: '\u202fLES ECHOS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3723,
          label: 'NOTRE TEMPS',
          quantity: null,
          quantity_formatted: '\u202fNOTRE TEMPS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3137,
          label: 'sable',
          quantity: null,
          quantity_formatted: '\u202fsable',
          unit_icon: 'fa-diamond'
        },
        {
          codes: [],
          deliverable_unit_id: 3724,
          label: 'Télé 2 semaines',
          quantity: null,
          quantity_formatted: '\u202fTélé 2 semaines',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3725,
          label: 'TELE 7 JOURS',
          quantity: null,
          quantity_formatted: '\u202fTELE 7 JOURS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3726,
          label: 'TELE LOISIRS',
          quantity: null,
          quantity_formatted: '\u202fTELE LOISIRS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3727,
          label: 'TELE STAR',
          quantity: null,
          quantity_formatted: '\u202fTELE STAR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 733,
          label: 'test',
          quantity: 0,
          quantity_formatted: '0\u202ftest',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3728,
          label: 'TV GRANDES CHAINES',
          quantity: null,
          quantity_formatted: '\u202fTV GRANDES CHAINES',
          unit_icon: 'fa-archive'
        }
      ],
      tags: []
    },
    {
      id: 'mission-19mVScQq6pH',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18295kE_ETj',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'mission',
      external_ref: 'mission-v14058941-2020_03_18-2286795',
      name: 'Client 2',
      date: '2020-03-18T21:00:00.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: 44.810583,
        lon: -0.727844
      },
      address: {
        city: 'Mérignac',
        country: 'France',
        detail: null,
        postalcode: '33700',
        state: null,
        street: '24 Chemin de la Poudrière'
      },
      comment: '',
      phone: null,
      reference: null,
      duration: 0,
      time_windows: [
        {
          end: '2020-03-18T22:00:00.000+01:00',
          start: '2020-03-18T21:00:00.000+01:00'
        }
      ],
      status_type_reference: 'mission_done',
      status_type_label: 'Fait',
      status_type_color: '#5CB85C',
      quantities: [
        {
          codes: [],
          deliverable_unit_id: 3694,
          label: '50LSANI_COL',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3695,
          label: '50LSANI_DEP',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3696,
          label: 'ALVAMPO_COL',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3697,
          label: 'ALVAMPO_DEP',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3698,
          label: 'B10LR_COL',
          quantity: null,
          quantity_formatted: '\u202fB10LR_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3699,
          label: 'B10LR_DEP',
          quantity: null,
          quantity_formatted: '\u202fB10LR_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3700,
          label: 'BA10LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3701,
          label: 'BA10LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3702,
          label: 'BA170_COL',
          quantity: null,
          quantity_formatted: '\u202fBA170_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3703,
          label: 'BA170_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA170_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3704,
          label: 'BA18LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3705,
          label: 'BA18LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3706,
          label: 'BA1LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3707,
          label: 'BA1LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3708,
          label: 'BA250ML_COL',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3709,
          label: 'BA250ML_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3710,
          label: 'BA3LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA3LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3138,
          label: 'brique',
          quantity: 10,
          quantity_formatted: '10\u202fbrique',
          unit_icon: 'fa-cube'
        },
        {
          codes: [],
          deliverable_unit_id: 3711,
          label: 'Centre Presse',
          quantity: null,
          quantity_formatted: '\u202fCentre Presse',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3712,
          label: 'ELLE',
          quantity: null,
          quantity_formatted: '\u202fELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3713,
          label: 'FEMME ACTUELLE',
          quantity: null,
          quantity_formatted: '\u202fFEMME ACTUELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3714,
          label: 'FIGARO',
          quantity: null,
          quantity_formatted: '\u202fFIGARO',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3715,
          label: 'FRANCE FOOTBALL',
          quantity: null,
          quantity_formatted: '\u202fFRANCE FOOTBALL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3716,
          label: 'INVESTIR',
          quantity: null,
          quantity_formatted: '\u202fINVESTIR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3717,
          label: 'LA CROIX',
          quantity: null,
          quantity_formatted: '\u202fLA CROIX',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3718,
          label: 'La Nouvelle République',
          quantity: null,
          quantity_formatted: '\u202fLa Nouvelle République',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3719,
          label: 'Le Monde',
          quantity: null,
          quantity_formatted: '\u202fLe Monde',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3720,
          label: 'LE PELERIN',
          quantity: null,
          quantity_formatted: '\u202fLE PELERIN',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3721,
          label: 'LE POINT',
          quantity: null,
          quantity_formatted: '\u202fLE POINT',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3722,
          label: 'LES ECHOS',
          quantity: null,
          quantity_formatted: '\u202fLES ECHOS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3723,
          label: 'NOTRE TEMPS',
          quantity: null,
          quantity_formatted: '\u202fNOTRE TEMPS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3137,
          label: 'sable',
          quantity: null,
          quantity_formatted: '\u202fsable',
          unit_icon: 'fa-diamond'
        },
        {
          codes: [],
          deliverable_unit_id: 3724,
          label: 'Télé 2 semaines',
          quantity: null,
          quantity_formatted: '\u202fTélé 2 semaines',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3725,
          label: 'TELE 7 JOURS',
          quantity: null,
          quantity_formatted: '\u202fTELE 7 JOURS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3726,
          label: 'TELE LOISIRS',
          quantity: null,
          quantity_formatted: '\u202fTELE LOISIRS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3727,
          label: 'TELE STAR',
          quantity: null,
          quantity_formatted: '\u202fTELE STAR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 733,
          label: 'test',
          quantity: 0,
          quantity_formatted: '0\u202ftest',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3728,
          label: 'TV GRANDES CHAINES',
          quantity: null,
          quantity_formatted: '\u202fTV GRANDES CHAINES',
          unit_icon: 'fa-archive'
        }
      ],
      tags: []
    },
    {
      id: 'mission-19mVScYoDvQ',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18295k6uE1T',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'mission',
      external_ref: 'mission-v14058942-2020_03_18-2286795',
      name: 'Client 3',
      date: '2020-03-18T21:04:42.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: 44.805651,
        lon: -0.691195
      },
      address: {
        city: 'Pessac',
        country: 'France',
        detail: null,
        postalcode: '33600',
        state: null,
        street: '185 Avenue de Beutre'
      },
      comment: '',
      phone: null,
      reference: null,
      duration: 0,
      time_windows: [],
      status_type_reference: 'mission_to_do',
      status_type_label: 'À faire',
      status_type_color: '#337AB7',
      quantities: [
        {
          codes: [],
          deliverable_unit_id: 3694,
          label: '50LSANI_COL',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3695,
          label: '50LSANI_DEP',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3696,
          label: 'ALVAMPO_COL',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3697,
          label: 'ALVAMPO_DEP',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3698,
          label: 'B10LR_COL',
          quantity: null,
          quantity_formatted: '\u202fB10LR_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3699,
          label: 'B10LR_DEP',
          quantity: null,
          quantity_formatted: '\u202fB10LR_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3700,
          label: 'BA10LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3701,
          label: 'BA10LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3702,
          label: 'BA170_COL',
          quantity: null,
          quantity_formatted: '\u202fBA170_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3703,
          label: 'BA170_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA170_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3704,
          label: 'BA18LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3705,
          label: 'BA18LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3706,
          label: 'BA1LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3707,
          label: 'BA1LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3708,
          label: 'BA250ML_COL',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3709,
          label: 'BA250ML_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3710,
          label: 'BA3LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA3LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3138,
          label: 'brique',
          quantity: 10,
          quantity_formatted: '10\u202fbrique',
          unit_icon: 'fa-cube'
        },
        {
          codes: [],
          deliverable_unit_id: 3711,
          label: 'Centre Presse',
          quantity: null,
          quantity_formatted: '\u202fCentre Presse',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3712,
          label: 'ELLE',
          quantity: null,
          quantity_formatted: '\u202fELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3713,
          label: 'FEMME ACTUELLE',
          quantity: null,
          quantity_formatted: '\u202fFEMME ACTUELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3714,
          label: 'FIGARO',
          quantity: null,
          quantity_formatted: '\u202fFIGARO',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3715,
          label: 'FRANCE FOOTBALL',
          quantity: null,
          quantity_formatted: '\u202fFRANCE FOOTBALL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3716,
          label: 'INVESTIR',
          quantity: null,
          quantity_formatted: '\u202fINVESTIR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3717,
          label: 'LA CROIX',
          quantity: null,
          quantity_formatted: '\u202fLA CROIX',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3718,
          label: 'La Nouvelle République',
          quantity: null,
          quantity_formatted: '\u202fLa Nouvelle République',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3719,
          label: 'Le Monde',
          quantity: null,
          quantity_formatted: '\u202fLe Monde',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3720,
          label: 'LE PELERIN',
          quantity: null,
          quantity_formatted: '\u202fLE PELERIN',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3721,
          label: 'LE POINT',
          quantity: null,
          quantity_formatted: '\u202fLE POINT',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3722,
          label: 'LES ECHOS',
          quantity: null,
          quantity_formatted: '\u202fLES ECHOS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3723,
          label: 'NOTRE TEMPS',
          quantity: null,
          quantity_formatted: '\u202fNOTRE TEMPS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3137,
          label: 'sable',
          quantity: null,
          quantity_formatted: '\u202fsable',
          unit_icon: 'fa-diamond'
        },
        {
          codes: [],
          deliverable_unit_id: 3724,
          label: 'Télé 2 semaines',
          quantity: null,
          quantity_formatted: '\u202fTélé 2 semaines',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3725,
          label: 'TELE 7 JOURS',
          quantity: null,
          quantity_formatted: '\u202fTELE 7 JOURS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3726,
          label: 'TELE LOISIRS',
          quantity: null,
          quantity_formatted: '\u202fTELE LOISIRS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3727,
          label: 'TELE STAR',
          quantity: null,
          quantity_formatted: '\u202fTELE STAR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 733,
          label: 'test',
          quantity: 0,
          quantity_formatted: '0\u202ftest',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3728,
          label: 'TV GRANDES CHAINES',
          quantity: null,
          quantity_formatted: '\u202fTV GRANDES CHAINES',
          unit_icon: 'fa-archive'
        }
      ],
      tags: []
    },
    {
      id: 'mission-19mVSchIND8',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18295k6uE1T',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'mission',
      external_ref: 'mission-v14058940-2020_03_18-2286795',
      name: 'Client 1',
      date: '2020-03-18T21:08:53.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: 44.824115,
        lon: -0.685122
      },
      address: {
        city: 'Mérignac',
        country: 'France',
        detail: null,
        postalcode: '33700',
        state: null,
        street: '60 Avenue de l\'Argonne'
      },
      comment: '',
      phone: null,
      reference: null,
      duration: 0,
      time_windows: [
        {
          end: '2020-03-18T10:10:00.000+01:00',
          start: '2020-03-18T10:00:00.000+01:00'
        }
      ],
      status_type_reference: 'mission_to_do',
      status_type_label: 'À faire',
      status_type_color: '#337AB7',
      quantities: [
        {
          codes: [],
          deliverable_unit_id: 3694,
          label: '50LSANI_COL',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3695,
          label: '50LSANI_DEP',
          quantity: null,
          quantity_formatted: '\u202f50LSANI_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3696,
          label: 'ALVAMPO_COL',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3697,
          label: 'ALVAMPO_DEP',
          quantity: null,
          quantity_formatted: '\u202fALVAMPO_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3698,
          label: 'B10LR_COL',
          quantity: null,
          quantity_formatted: '\u202fB10LR_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3699,
          label: 'B10LR_DEP',
          quantity: null,
          quantity_formatted: '\u202fB10LR_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3700,
          label: 'BA10LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3701,
          label: 'BA10LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA10LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3702,
          label: 'BA170_COL',
          quantity: null,
          quantity_formatted: '\u202fBA170_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3703,
          label: 'BA170_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA170_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3704,
          label: 'BA18LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3705,
          label: 'BA18LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA18LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3706,
          label: 'BA1LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3707,
          label: 'BA1LP_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA1LP_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3708,
          label: 'BA250ML_COL',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3709,
          label: 'BA250ML_DEP',
          quantity: null,
          quantity_formatted: '\u202fBA250ML_DEP',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3710,
          label: 'BA3LP_COL',
          quantity: null,
          quantity_formatted: '\u202fBA3LP_COL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3138,
          label: 'brique',
          quantity: 10,
          quantity_formatted: '10\u202fbrique',
          unit_icon: 'fa-cube'
        },
        {
          codes: [],
          deliverable_unit_id: 3711,
          label: 'Centre Presse',
          quantity: null,
          quantity_formatted: '\u202fCentre Presse',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3712,
          label: 'ELLE',
          quantity: null,
          quantity_formatted: '\u202fELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3713,
          label: 'FEMME ACTUELLE',
          quantity: null,
          quantity_formatted: '\u202fFEMME ACTUELLE',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3714,
          label: 'FIGARO',
          quantity: null,
          quantity_formatted: '\u202fFIGARO',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3715,
          label: 'FRANCE FOOTBALL',
          quantity: null,
          quantity_formatted: '\u202fFRANCE FOOTBALL',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3716,
          label: 'INVESTIR',
          quantity: null,
          quantity_formatted: '\u202fINVESTIR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3717,
          label: 'LA CROIX',
          quantity: null,
          quantity_formatted: '\u202fLA CROIX',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3718,
          label: 'La Nouvelle République',
          quantity: null,
          quantity_formatted: '\u202fLa Nouvelle République',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3719,
          label: 'Le Monde',
          quantity: null,
          quantity_formatted: '\u202fLe Monde',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3720,
          label: 'LE PELERIN',
          quantity: null,
          quantity_formatted: '\u202fLE PELERIN',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3721,
          label: 'LE POINT',
          quantity: null,
          quantity_formatted: '\u202fLE POINT',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3722,
          label: 'LES ECHOS',
          quantity: null,
          quantity_formatted: '\u202fLES ECHOS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3723,
          label: 'NOTRE TEMPS',
          quantity: null,
          quantity_formatted: '\u202fNOTRE TEMPS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3137,
          label: 'sable',
          quantity: null,
          quantity_formatted: '\u202fsable',
          unit_icon: 'fa-diamond'
        },
        {
          codes: [],
          deliverable_unit_id: 3724,
          label: 'Télé 2 semaines',
          quantity: null,
          quantity_formatted: '\u202fTélé 2 semaines',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3725,
          label: 'TELE 7 JOURS',
          quantity: null,
          quantity_formatted: '\u202fTELE 7 JOURS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3726,
          label: 'TELE LOISIRS',
          quantity: null,
          quantity_formatted: '\u202fTELE LOISIRS',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3727,
          label: 'TELE STAR',
          quantity: null,
          quantity_formatted: '\u202fTELE STAR',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 733,
          label: 'test',
          quantity: 0,
          quantity_formatted: '0\u202ftest',
          unit_icon: 'fa-archive'
        },
        {
          codes: [],
          deliverable_unit_id: 3728,
          label: 'TV GRANDES CHAINES',
          quantity: null,
          quantity_formatted: '\u202fTV GRANDES CHAINES',
          unit_icon: 'fa-archive'
        }
      ],
      tags: []
    },
    {
      id: 'mission-19mVScjFVCs',
      company_id: 'company-fIxbpq7vNj',
      route_id: 'route-19mVSxaALFR',
      user_id: 'user-fIxc7jcZYs',
      mission_status_type_id: 'mission_status_type-18297l-IA3U',
      sync_user: '5ffbb992f9c44a4e7a50897f785c5f63d38e587130f7cf86a07359d609dc50dd',
      mission_type: 'arrival',
      external_ref: 'arrival-4025-2020_03_18-2286795',
      name: 'Départ véhicule',
      date: '2020-03-18T21:26:53.000+01:00',
      eta: null,
      eta_computed_at: null,
      eta_computed_mode: null,
      location: {
        lat: 44.83423,
        lon: -0.60068
      },
      address: {
        city: 'Bordeaux',
        country: 'France',
        postalcode: null,
        state: null,
        street: null
      },
      comment: null,
      phone: null,
      reference: null,
      duration: null,
      time_windows: null,
      status_type_reference: 'arrival_to_do',
      status_type_label: 'À faire',
      status_type_color: '#337AB7',
      quantities: null,
      tags: null
    }
  ],
  user_email: 'driver1@mapotempo.com'
};
