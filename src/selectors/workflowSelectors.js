import { createSelector } from 'reselect';

// =========
// Selectors
// =========

const missionStatusTypesSelector = state => state.fleet.workflow.missionStatusTypeItems;

const missionActionsTypesSelector = state => state.fleet.workflow.missionStatusTypeItems;

// =========================
// missionStatusTypesMapper:
// 
// Create missionStatusType map for fast ID matching
// =========================
export const missionStatusTypesMapper = createSelector(
  missionStatusTypesSelector,
  (statusTypesList) => {
    var res = {};
    statusTypesList.forEach((statusType) => {
      res[statusType.id] = statusType;
    });
    return res;
  }
);

// =========================
// missionActionsTypesMapper:
// 
// Create missionActionType map for fast ID matching
// =========================
export const missionActionsTypesMapper = createSelector(
  missionActionsTypesSelector,
  (actionTypesList) => {
    var res = {};
    actionTypesList.forEach((actionType) => {
      res[actionType.id] = actionType;
    });
    return res;
  }
);
