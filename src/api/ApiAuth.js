import { doGet } from './ApiCommon';
import { AuthApiException } from './ApiException';
export default {
  apiFetchAuthUser(syncUser, { host, apiKey }) {
    return doGet(host, { url: `/api/0.1/users/${syncUser}` ,apiKey })
      .then(data => Promise.resolve(data.user))
      .catch(error => {
        switch (error.status) {
          case 401:
            throw new AuthApiException('Credential invalid', error.status);
          case 404:
            throw new AuthApiException('Credential invalid', error.status);
          default:
            throw error;
        }
      });
  }
};
