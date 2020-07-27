import { createSelector } from 'reselect';

// =========
// Selectors
// =========

const usersSelector = state => state.fleet.users.items;

// ===================
// usersMapper:
//
// Create user map for fast ID matching
// ===================
export const usersMapper = createSelector(
  usersSelector,
  users => {
    let res = {};
    for (let i = 0; i < users.length; i++)
      res[users[i].id] = users[i];
    return res;
  }
);
