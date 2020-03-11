import {
  REQUEST_ROUTES, RECEIVE_ROUTES, ERRORS_ROUTES, CLEAR_ROUTES,
  RECEIVE_ROUTE_MISSIONS, REQUEST_ROUTES_MISSIONS_BEGIN, REQUEST_ROUTES_MISSIONS_END
} from '../actions';

const initState = {
  isFetching: false,
  errors: null,
  items: [],
  isFetchingRoutesMissions: false
};

export default function routesReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_ROUTES:
      state = { ...state, isFetching: true };
      break;
    case RECEIVE_ROUTES:
      state = { ...state, isFetching: false, errors: null };
      state.items = action.routes.map(newRoute => {
        let oldRoute = state.items.find(oldRoute => oldRoute.id == newRoute.id);
        let missions = (oldRoute && oldRoute.missions) ? oldRoute.missions : [];
        newRoute.missions = missions;
        newRoute.extraInfo = (oldRoute && oldRoute.oldExtraInfo) ? oldRoute.oldExtraInfo : computeExtraInfo(newRoute);
        return {...newRoute};
      });
      break;
    case CLEAR_ROUTES:
      state = { ...initState };
      break;
    case ERRORS_ROUTES:
      console.error(action.errors);
      state = { ...state, errors: action.errors, isFetching: false };
      break;
    case REQUEST_ROUTES_MISSIONS_BEGIN:
      state = { ...state, isFetchingRoutesMissions: true };
      break;
    case REQUEST_ROUTES_MISSIONS_END:
      state = { ...state, isFetchingRoutesMissions: false };
      break;
    case RECEIVE_ROUTE_MISSIONS:
      var index = state.items.findIndex(route => route.id == action.route.id);
      if (index >= 0) {
        state = { ...state, items: [...state.items] };
        state.items[index] = {...action.route, extraInfo: computeExtraInfo(action.route)};
      }
      break;
    default:
      break;
  }
  return state;
}

// ======================
// Extra info computation
// ======================

const initialExtraInfo = () => {
  return {
    advancing: 0,
    scheduledArrival: 0,
    eta: '1970-01-01T00:00:00.000',
    delay: 0,
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

const computeAdvancing = (actualDate, departureDate, eta) => {
  if (actualDate > eta)
    return 100;
  else if (actualDate > departureDate)
    return Math.round(((actualDate - departureDate) / (eta - departureDate)) * 100);
  else
    return 0;
};

const computeExtraInfo = (route) => {
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

    return extraInfo;
  }, initialExtraInfo());
  // FIXME: Fake
  res.delay = Math.floor(Math.random() * 60);
  return res;
};
