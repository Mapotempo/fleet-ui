import { doGet } from './ApiCommon';

export default {
  apiFetchMissionStatusTypes(syncUser, {host, apiKey, onSuccess, onError }) {
    doGet(host, {
      url: 'api/0.1/mission_status_types/',
      onSuccess: (data) => onSuccess(data.mission_status_types),
      onError: (error) => onError(error),
      apiKey,
      parameters: {
        'sync_user': syncUser
      }
    });
  },
  apiFetchMissionActionTypes(syncUser, {host, apiKey, onSuccess, onError }) {
    doGet(host, {
      url: 'api/0.1/mission_action_types/',
      onSuccess: (data) => onSuccess(data.mission_action_types),
      onError: (error) => onError(error),
      apiKey,
      parameters: {
        'sync_user': syncUser
      }
    });
  }
};
