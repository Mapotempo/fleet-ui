import { doGet } from './ApiCommon';

export default {
  apiFetchAuthUser(syncUser, { host, apiKey }) {
    return doGet(host, { url: `api/0.1/users/${syncUser}` ,apiKey })
      .then((data) => Promise.resolve(data.user))
      .catch((error) => {
        switch (error.status) {
          case 401:
            error.message = 'Credential invalid';
            break;
          case 404:
            error.message = 'Utilisateur inconnue';
            break;
          default:
            error.message = 'Erreur inconnue';
        }
        return Promise.reject(error);
      });
  }
};
