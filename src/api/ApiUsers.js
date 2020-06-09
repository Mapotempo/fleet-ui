import { doGet } from './ApiCommon';

export default {
  apiFetchUsersCompany({host, apiKey }) {
    return doGet(host, {
      url: '/api/0.1/users/',
      apiKey
    })
      .then(data => Promise.resolve(data.users));
  },
  apiFetchUserInfosCompany({ host, apiKey }) {
    return doGet(host, {
      url: `/api/0.1/user_info/`,
      apiKey
    })
      .then(data => Promise.resolve(data.user_infos));
  },
  apiFetchUserSettingsCompany({ host, apiKey }) {
    return doGet(host, {
      url: `/api/0.1/user_settings/`,
      apiKey
    })
      .then(data => Promise.resolve(data.user_infos));
  }
};
