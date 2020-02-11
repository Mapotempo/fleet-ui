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
  missionActionTypeItems: []
};

export default function workflowReducer(state = initState, action) {
  switch (action.type) {
    case REQUEST_MISSION_STATUS_TYPE:
      state = { ...state, isFetchingMST: true };
      break;
    case RECEIVE_MISSION_STATUS_TYPE:
      state = { ...state };
      state.isFetchingMST = false;
      state.errorsMST = null;
      state.missionStatusTypeItems = [...action.missionStatusTypes];
      break;
    case ERRORS_MISSION_STATUS_TYPE:
      state = { ...state, errorsMST: action.errors, isFetching: false };
      break;
    case REQUEST_MISSION_ACTION_TYPE:
      state = { ...state, isFetchingMAT: true };
      break;
    case RECEIVE_MISSION_ACTION_TYPE:
      state = { ...state };
      state.isFetchingMAT = false;
      state.errorsMAT = null;
      state.missionActionTypeItems = [...action.missionActionTypes];
      break;
    case ERRORS_MISSION_ACTION_TYPE:
      state = { ...state, errorsMAT: action.errors, isFetchingMAT: false };
      break;
    default:
      break;
  }
  return state;
}
