import { doGet } from './ApiCommon';

export default {
  apiFetchUser({host, apiKey, onSuccess, onError }) {
    doGet(host, {
      url: 'api/0.1/users/',
      onSuccess: (data) => onSuccess(data.users),
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
