import { generateUser, generateUserInfo } from './fakeUser';
import { generateMissionActionsType, generateMissionStatusType } from './fakeWorkflow';
import { generateRoute } from './fakeRoute';

export const generateCompanyData = (companyId, email, apiKey) =>
{
  let today = new Date();
  let users = [generateUser(companyId, false, email, apiKey), generateUser(companyId), generateUser(companyId), generateUser(companyId), generateUser(companyId), generateUser(companyId)];
  let userInfoSet = users.filter(user => user.vehicle).reduce((dataSet, user) => {
    return {
      ...dataSet,
      [user.sync_user]: generateUserInfo(companyId, user)
    };
  }, {});
  let workflow = {
    missionActionTypes: generateMissionActionsType(companyId),
    missionStatusTypes: generateMissionStatusType(companyId)
  };
  let routes = users.filter(user => user.vehicle).map(user => generateRoute(user, today, workflow));
  return {
    users: users,
    userInfoSet: userInfoSet,
    workflow: workflow,
    routes: routes
  };
};

export default generateCompanyData;
