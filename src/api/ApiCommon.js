var axios = require('axios');

const processError = (error) => {
  let resError = { status: -1, message: '' };
  if (error.response && error.response.data) {
    if (error.response.data.errors)
      resError.message = error.response.data.errors;
    else
      resError.message = error.response.data;
    resError.status = error.response.status;
  }
  else {
    console.error(error);
    resError.message = error.toString();
  }
  return resError;
};
const doRequest = (type, host, {onSuccess, onError, url='', body=null, apiKey = ''}) => {
  axios({
    method: type,
    url: host + url + '?api_key=' + apiKey,
    headers: {
      'Content-Type': 'application/json'
    },
    data: body
  }).then(function(response) {
    onSuccess(response.data);
  }).catch(function(error) {
    onError(processError(error));
  });
};

export const doGet = (host, {onSuccess, onError, url='', apiKey = ''}) => {
  doRequest('GET', host, {onSuccess, onError, url, apiKey});
};
export const doPost = (host, {onSuccess, onError, url='', apiKey = '', body={}}) => {
  doRequest('POST', host, {onSuccess, onError, url, apiKey, body});
};
export const doFetch = (host, {onSuccess, onError, url='', apiKey = '', body={}}) => {
  doRequest('FETCH', host, {onSuccess, onError, url, apiKey, body});
};
export const doDelete = (host, { onSuccess, onError, url = '', apiKey = '' }) => {
  doRequest('DELETE', host, {onSuccess, onError, url, apiKey});
};
