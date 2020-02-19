import { ApiWorkflow } from '../api';

// ====================
// WORKFLOW FULL ACTION
// ====================

export const fetchWorkflow = () => {
  return (dispatch) => {
    dispatch(fetchMissionStatusTypes());
    dispatch(fetchMissionActionTypes());
  };
};

// ==========================
// MISSION STATUS TYPE ACTION
// ==========================

export const REQUEST_MISSION_STATUS_TYPE = 'REQUEST_MISSION_STATUS_TYPE';
const requestMissionStatusType = () => {
  return {
    type: REQUEST_MISSION_STATUS_TYPE
  };
};

export const RECEIVE_MISSION_STATUS_TYPE = 'RECEIVE_MISSION_STATUS_TYPE';
const receiveMissionStatusType = (missionStatusTypes) => {
  return {
    type: RECEIVE_MISSION_STATUS_TYPE,
    missionStatusTypes
  };
};

export const ERRORS_MISSION_STATUS_TYPE = 'ERRORS_MISSION_STATUS_TYPE';
const errorsMissionStatusType = (errors) => {
  return {
    type: ERRORS_MISSION_STATUS_TYPE,
    errors
  };
};

const fetchMissionStatusTypes = () => {
  return (dispatch, getState) => {
    dispatch(requestMissionStatusType());
    return Promise
      .all(getState().fleet.auth.users.map((authUser) => ApiWorkflow.apiFetchMissionStatusTypes(
        authUser.sync_user,
        {
          host: getState().fleet.fleetHost,
          apiKey: authUser.api_key,
        }
      )))
      .then(res => res.flat())
      .then(missionStatusTypes => dispatch(receiveMissionStatusType(missionStatusTypes)))
      .catch(errors => dispatch(errorsMissionStatusType(errors)));
  };
};

// ==========================
// MISSION STATUS TYPE ACTION
// ==========================

export const REQUEST_MISSION_ACTION_TYPE = 'REQUEST_MISSION_ACTION_TYPE';
const requestMissionActionType = () => {
  return {
    type: REQUEST_MISSION_ACTION_TYPE
  };
};

export const RECEIVE_MISSION_ACTION_TYPE = 'RECEIVE_MISSION_ACTION_TYPE';
const receiveMissionActionType = (missionActionTypes) => {
  return {
    type: RECEIVE_MISSION_ACTION_TYPE,
    missionActionTypes
  };
};

export const ERRORS_MISSION_ACTION_TYPE = 'ERRORS_MISSION_ACTION_TYPE';
const errorsMissionActionType = (errors) => {
  return {
    type: ERRORS_MISSION_ACTION_TYPE,
    errors
  };
};

const fetchMissionActionTypes = () => {
  return (dispatch, getState) => {
    dispatch(requestMissionActionType());
    return Promise
      .all(getState().fleet.auth.users.map((authUser) => ApiWorkflow.apiFetchMissionActionTypes(
        authUser.sync_user,
        {
          host: getState().fleet.fleetHost,
          apiKey: authUser.api_key,
        }
      )))
      .then(res => res.flat())
      .then(missionActionTypes => dispatch(receiveMissionActionType(missionActionTypes)))
      .catch(errors => dispatch(errorsMissionActionType(errors)));
  };
};
