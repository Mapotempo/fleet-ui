import { doGet } from './ApiCommon';

export default {
  apiFetchUser({host, apiKey }) {
    return doGet(host, {
      url: 'api/0.1/users/',
      apiKey
    })
      .then((data) => Promise.resolve(data.users));
  }
};
