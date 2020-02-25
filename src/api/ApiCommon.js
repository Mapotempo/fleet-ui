var axios = require('axios');

axios.interceptors.response.use((response) => response.data,
  (error) => {
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
    throw resError;
  }
);

const doRequest = (type, host, { url = '', body = null, apiKey = '', parameters = {}}) => {
  return axios({
    method: type,
    url: host + url,
    headers: {
      'Content-Type': 'application/json'
    },
    data: body,
    params: {
      api_key: apiKey,
      ...parameters
    }
  });
};

export const doGet = (host, { url='', apiKey = '', parameters={} }) => {
  return doRequest('GET', host, { url, apiKey, parameters });
};
export const doPost = (host, { url='', apiKey = '', body={}, parameters={} }) => {
  return doRequest('POST', host, { url, apiKey, body, parameters });
};
export const doFetch = (host, { url='', apiKey = '', body={}, parameters={} }) => {
  return doRequest('FETCH', host, { url, apiKey, body, parameters });
};
export const doDelete = (host, {  url = '', apiKey = '', parameters = {} }) => {
  return doRequest('DELETE', host, { url, apiKey, parameters });
};
