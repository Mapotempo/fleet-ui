import createCachedSelector from 're-reselect';

// ========================
// apiKeyByCompanySelector:
//
// ========================
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

// ========================
// tokenBySyncUserSelector:
//
// ========================
export const tokenBySyncUserSelector = createCachedSelector(
  state => state.fleet.auth.users,
  state => state.fleet.users.items,
  (state, syncUser) => syncUser,
  (authUsers, users, syncUser) => {
    let u = authUsers.find(authUser => {
      let u = users.find((user) => user.sync_user === syncUser);
      console.log('->', authUser.company_id);
      console.log('->', u.company_id);
      return authUser.company_id === u.company_id;
    });
    return u.api_key;
  }
)(
  (state, syncUser) => syncUser
);
