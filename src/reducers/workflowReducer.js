import {
  REQUEST_MISSION_STATUS_TYPE,
  RECEIVE_MISSION_STATUS_TYPE,
  ERRORS_MISSION_STATUS_TYPE,
  REQUEST_MISSION_ACTION_TYPE,
  RECEIVE_MISSION_ACTION_TYPE,
  ERRORS_MISSION_ACTION_TYPE
} from '../actions';

const initState = {
  isFetchingMST: false,
  isFetchingMAT: false,
  errorsMST: null,
  errorsMAT: null,
  missionStatusTypeItems: [],
  missionActionTypeItems: [],
  readyMST: false,
  readyMAT: false
};

export default function workflowReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_MISSION_STATUS_TYPE:
      state = { ...state, isFetchingMST: true, readyMST: false };
      break;
    case RECEIVE_MISSION_STATUS_TYPE:
      state = { ...state, isFetchingMST: false, errorsMST: null, readyMST: true };
      state.missionStatusTypeItems = [...action.missionStatusTypes];
      break;
    case ERRORS_MISSION_STATUS_TYPE:
      console.error(action.errors);
      state = { ...state, errorsMST: action.errors, isFetching: false };
      break;
    case REQUEST_MISSION_ACTION_TYPE:
      state = { ...state, isFetchingMAT: true, readyMAT: false};
      break;
    case RECEIVE_MISSION_ACTION_TYPE:
      state = { ...state, isFetchingMAT: false, errorsMAT: null, readyMAT: true };
      state.missionActionTypeItems = [...action.missionActionTypes];
      break;
    case ERRORS_MISSION_ACTION_TYPE:
      console.error(action.errors);
      state = { ...state, errorsMAT: action.errors, isFetchingMAT: false };
      break;
    default:
      break;
  }
  return state;
}
