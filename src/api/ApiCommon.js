import axios from 'axios';
import { CancelApiException, BaseApiException } from './ApiException';
export const CancelToken = axios.CancelToken;

axios.interceptors.response.use(
  response => response.data,
  thrown => {
    if (axios.isCancel(thrown))
      throw new CancelApiException();
    else if (thrown.isAxiosError && thrown.response) {
      let status = thrown.response.status;
      let message = thrown.response.data ? thrown.response.data.error : thrown.toString();
      throw new BaseApiException(message, status);
    }
    else
      throw thrown;
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
