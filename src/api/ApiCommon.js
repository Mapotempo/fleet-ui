import axios from 'axios';

export const CancelToken = axios.CancelToken;

axios.interceptors.response.use(response => response.data,
  thrown => {
    let message = thrown ? thrown.toString() : 'Unknow Error';
    let status = -1;
    if (axios.isCancel(thrown)) {
      message = "fetch cancel";
      status = -2;
    } else {
      if (thrown && thrown.response && thrown.response.status > -1) {
        status = thrown.response.status;
        message = thrown.response.data ? thrown.response.data.error : thrown.toString();
      }
      if (process.env.NODE_ENV != 'development')
        message = 'Error, call your support team'; //FIXME: translate;
    }
    throw { message, status };
  }
);

const doRequest = (type, host, { url = '', body = null, apiKey = '', parameters = {}}, token) => {
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
    },
    cancelToken: token
  });
};

export const doGet = (host, { url='', apiKey = '', parameters={} }, token = undefined) => {
  return doRequest('GET', host, { url, apiKey, parameters }, token);
};
export const doPost = (host, { url='', apiKey = '', body={}, parameters={} }, token = undefined) => {
  return doRequest('POST', host, { url, apiKey, body, parameters }, token);
};
export const doFetch = (host, { url='', apiKey = '', body={}, parameters={} }, token = undefined) => {
  return doRequest('FETCH', host, { url, apiKey, body, parameters }, token);
};
export const doDelete = (host, {  url = '', apiKey = '', parameters = {} }, token = undefined) => {
  return doRequest('DELETE', host, { url, apiKey, parameters }, token);
};
