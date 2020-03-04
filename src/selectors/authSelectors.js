import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';

// ===========
// isReadyData
// ===========
export const isReadyData = createSelector(
  state => state.fleet.workflow.readyMST,
  state => state.fleet.workflow.readyMAT,
  state => state.fleet.users.ready,
  (readyMST, readyMAT, readyUsers)  => readyMST && readyMAT && readyUsers
);

// ========================
// apiKeyByCompanySelector:
//
// ========================
export const apiKeyByCompanySelector = createCachedSelector(
  state => state.fleet.auth.users,
  (state, companyId) => companyId,
  (authUsers, companyId) => {
    return authUsers.find((user) => user.company_id === companyId);
  }
)(
  (state, companyId) => companyId
);

// ========================
// tokenBySyncUserSelector:
//
// ========================
export const tokenBySyncUserSelector = createCachedSelector(
  state => state.fleet.auth.users,
  state => state.fleet.users.items,
  (state, syncUser) => syncUser,
  (authUsers, users, syncUser) => authUsers.find(authUser => authUser.company_id === users.find((user) => user.sync_user === syncUser).company_id).api_key
)(
  (state, syncUser) => syncUser
);
