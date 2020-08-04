import { ApiWorkflow, BaseApiException } from '../api';
import { flatten } from '../lib/flatten';

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
const errorsMissionStatusType = (error) => {
  return {
    type: ERRORS_MISSION_STATUS_TYPE,
    error
  };
};

const fetchMissionStatusTypes = () => {
  return (dispatch, getState) => {
    dispatch(requestMissionStatusType());
    return Promise
      .all(getState().fleet.auth.users.map((authUser) => ApiWorkflow.apiFetchMissionStatusTypes(
        authUser.sync_user,
        {
          host: getState().fleet.config.host,
          apiKey: authUser.api_key,
        }
      )))
      .then(res => flatten(res))
      .then(missionStatusTypes => dispatch(receiveMissionStatusType(missionStatusTypes)))
      .catch(error => {
        if (!(error instanceof BaseApiException))
          throw error;
        dispatch(errorsMissionStatusType(error));
      });
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
const errorsMissionActionType = (error) => {
  return {
    type: ERRORS_MISSION_ACTION_TYPE,
    error
  };
};

const fetchMissionActionTypes = () => {
  return (dispatch, getState) => {
    dispatch(requestMissionActionType());
    return Promise
      .all(getState().fleet.auth.users.map((authUser) => ApiWorkflow.apiFetchMissionActionTypes(
        authUser.sync_user,
        {
          host: getState().fleet.config.host,
          apiKey: authUser.api_key,
        }
      )))
      .then(res => flatten(res))
      .then(missionActionTypes => dispatch(receiveMissionActionType(missionActionTypes)))
      .catch(error => {
        if (!(error instanceof BaseApiException))
          throw error;
        dispatch(errorsMissionActionType(error));
      });

  };
};
