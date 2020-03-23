import { doGet } from './ApiCommon';

export default {
  apiFetchRoutes(withMissions, from, to, { host, apiKey }) {
    return doGet(host, {
      url: 'api/0.1/routes/',
      apiKey,
      parameters: {
        'with_missions': withMissions,
        'from': from,
        'to': to
      }
    })
      .then(data => Promise.resolve(data.routes));
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
