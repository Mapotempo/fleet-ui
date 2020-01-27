var axios = require('axios');

export default {
  apiFetchUser(host, apiKey, { onSuccess, onError }) {
    axios({
      method: 'GET',
      url: host + 'api/0.1/users/',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': '*',
        'Access-Control-Allow-Header': '*',
        'Content-Type': 'application/json',
        'Authorization': apiKey
      }
    }).then(function(response) {
      onSuccess(response.data.users);
    }).catch(function(error) {
      onError(error);
    });
  }
};
