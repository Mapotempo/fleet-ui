import { doGet } from './ApiCommon';

export default {
  apiFetchUser({host, apiKey }) {
    return doGet(host, {
      url: '/api/0.1/users/',
      apiKey
    })
      .then((data) => Promise.resolve(data.users));
  },
  apiFetchUserInfo(syncUser, { host, apiKey }) {
    return doGet(host, {
      url: `/api/0.1/users/${syncUser}/user_info`,
      apiKey
    })
      .then((data) => Promise.resolve(data.user_infos));
  }
};
