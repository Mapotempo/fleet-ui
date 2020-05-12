import { doGet } from './ApiCommon';

export default {
  apiFetchMissionStatusTypes(syncUser, {host, apiKey }) {
    return doGet(host, {
      url: '/api/0.1/mission_status_types/',
      apiKey,
      parameters: { 'sync_user': syncUser }
    }).then((data) => Promise.resolve(data.mission_status_types));
  },
  apiFetchMissionActionTypes(syncUser, {host, apiKey }) {
    return doGet(host, {
      url: '/api/0.1/mission_action_types/',
      apiKey,
      parameters: { 'sync_user': syncUser }
    }).then((data) => Promise.resolve(data.mission_action_types));
  }
};
