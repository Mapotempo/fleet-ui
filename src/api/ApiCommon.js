var axios = require('axios');

axios.interceptors.response.use((response) => response.data,
  (error) => {
    let message = error ? error.toString() : 'Unknow Error';
    let status = -1;
    if (error && error.response && error.response.status > -1) {
      status = error.response.status;
      message = error.response.data.error;
    }
    if (process.env.NODE_ENV == 'development')
      message = 'Error, call your support team'; //FIXME: translate;
    throw {message, status};
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
