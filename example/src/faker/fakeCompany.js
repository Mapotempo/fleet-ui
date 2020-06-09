import { generateUser, generateUserInfos, generateUserSettings } from './fakeUser';
import { generateMissionActionsType, generateMissionStatusType } from './fakeWorkflow';
import { generateRoute } from './fakeRoute';
import { getRandomInt } from './fakeUtils';

export const generateCompanyData = (companyId, email, apiKey, minMission = 0, maxMission=1000) =>
{
  let today = new Date();
  let users = [generateUser(companyId, false, email, apiKey)];
  for (let i = 0; i < getRandomInt(minMission, maxMission); i++) {
    users.push(generateUser(companyId));
  }

  let userInfoSet = users.filter(user => user.vehicle).reduce((dataSet, user) => {
    return {
      ...dataSet,
      [user.sync_user]: generateUserInfos(companyId, user)
    };
  }, {});
  let userSettingsSet = users.filter(user => user.vehicle).reduce((dataSet, user) => {
    return {
      ...dataSet,
      [user.sync_user]: generateUserSettings(companyId, user)
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
    userSettingsSet: userSettingsSet,
    workflow: workflow,
    routes: routes
  };
};

export default generateCompanyData;
