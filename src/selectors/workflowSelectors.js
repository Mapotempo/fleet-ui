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
    let res = {};
    for (let i = 0; i < statusTypesList.length; i++)
      res[statusTypesList[i].id] = statusTypesList[i];
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
    let res = {};
    for (let i = 0; i < actionTypesList.length; i++)
      res[actionTypesList[i].id] = actionTypesList[i];
    return res;
  }
);
