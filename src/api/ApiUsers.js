import { doGet } from './ApiCommon';
import { IgnoredApiException } from './ApiException';

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
      .then(data => Promise.resolve(data.user_infos))
      .catch(error => {
        switch (error.status) {
          case 404:
            throw new IgnoredApiException();
          default:
            throw error;
        }
      });
  },
  apiFetchUserSettingsCompany({ host, apiKey }) {
    return doGet(host, {
      url: `/api/0.1/user_settings/`,
      apiKey
    })
      .then(data => Promise.resolve(data.user_infos))
      .catch(error => {
        switch (error.status) {
          case 404:
            throw new IgnoredApiException();
          default:
            throw error;
        }
      });
  }
};
