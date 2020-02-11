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

// ===========================
// finalMissionStatusTypeInfo:
// 
// Compute workflow statusTypeInfo
// doneIDs => reference contain _done string
// undoneIDs => reference contain _undone string
// info shape: 
// {
//    doneIDs: []
//    undoneIDs: []
//    allIDs: []
// }
// ===========================
export const finalMissionStatusTypeInfo = createSelector(
  missionStatusTypesSelector,
  (statusTypesList) => statusTypesList.reduce((accumulator, statusType) => {
    if (statusType.is_last)
    {
      accumulator.allIDs.push(statusType.id);
      if (statusType.reference.includes('_done')) {
        accumulator.doneIDs.push(statusType.id);
      }
      if (statusType.reference.includes('_undone')) {
        accumulator.undoneIDs.push(statusType.id);
      }
    }
    return accumulator;
  },
  {
    doneIDs: [],
    undoneIDs: [],
    allIDs: []
  })
);

