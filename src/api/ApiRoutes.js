import { doGet } from './ApiCommon';

export default {
  apiFetchRoute(withMissions, { host, apiKey, onSuccess, onError }) {
    let from = new Date();
    from.setUTCHours(0, 0, 0, 0);
    doGet(host, {
      url: 'api/0.1/routes/',
      onSuccess: (data) => onSuccess(data.routes),
      onError: (error) => onError(error),
      apiKey,
      parameters: {
        'with_missions': withMissions,
        'from': from.toISOString()
      }
    });
  }
};
