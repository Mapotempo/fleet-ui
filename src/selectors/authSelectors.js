import createCachedSelector from 're-reselect';

// ==================
// apiKeyByCompanySelector:
//
// ==================
export const apiKeyByCompanySelector = createCachedSelector(
  state => state.fleet.auth.users,
  (state, companyId) => companyId,
  (authUsers, companyId) => {
    console.log(authUsers, companyId);
    return authUsers.find((user) => user.company_id === companyId);
  }
)(
  (state, companyId) => companyId
);

// ==================
// apiKeyByCompanySelector:
//
// ==================
export const tokenBySyncUserSelector = createCachedSelector(
  state => state.fleet.auth.users,
  state => state.fleet.users.items,
  (state, syncUser) => syncUser,
  (authUsers, users, syncUser) => authUsers.find(authUser => authUser.company_id === users.find((user) => user.sync_user === syncUser).company_id).api_key
)(
  (state, syncUser) => syncUser
);
