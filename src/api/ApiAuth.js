import { doGet } from './ApiCommon';

export default {
  apiFetchAuthUser(syncUser, {host, apiKey, onSuccess, onError }) {
    doGet(host, {
      url: 'api/0.1/users/' + syncUser,
      onSuccess: (data) => onSuccess(data.user),
      onError: (error) => {
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
        onError(error);
      },
      apiKey
    });
  }
};
