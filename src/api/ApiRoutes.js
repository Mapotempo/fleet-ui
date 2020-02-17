import { doGet } from './ApiCommon';

export default {
  apiFetchRoutes(withMissions, { host, apiKey }) {
    let from = new Date();
    from.setUTCHours(0, 0, 0, 0);
    return doGet(host, {
      url: 'api/0.1/routes/',
      apiKey,
      parameters: {
        'with_missions': withMissions,
        'from': from.toISOString()
      }
    })
      .then((data) => Promise.resolve(data.routes));
  },
  apiFetchRoute(routeId, { host, apiKey }) {
    return doGet(host, {
      url: `api/0.1/routes/${routeId}`,
      apiKey,
      parameters: {
        'with_missions': true
      }
    })
      .then((data) => Promise.resolve(data.route));
  }
};
