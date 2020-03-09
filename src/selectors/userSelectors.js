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
    users.forEach((user) => {
      res[user.id] = user;
    });
    return res;
  }
);
