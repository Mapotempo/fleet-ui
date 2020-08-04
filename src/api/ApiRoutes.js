import { doGet, CancelToken } from './ApiCommon';

export default {
  apiFetchRoutes(withMissions, from, to, { host, apiKey }) {
    return doGet(host, {
      url: '/api/0.1/routes/',
      apiKey,
      parameters: {
        'with_missions': withMissions,
        'from': from,
        'to': to
      }
    }, this._axiosSource.token)
      .then(data => data.routes);
  },
  apiFetchRoute(routeId, { host, apiKey }) {
    return doGet(host, {
      url: `/api/0.1/routes/${routeId}`,
      apiKey,
      parameters: {
        'with_missions': true
      }
    }, this._axiosSource.token)
      .then((data) => data.route);
  },
  _axiosSource: CancelToken.source(),
  cancelFetch() {
    this._axiosSource.cancel();
    this._axiosSource = CancelToken.source();
  }
};
