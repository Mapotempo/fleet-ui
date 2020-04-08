const deserializeUrlParams = hashString => hashString.split('&').reduce((result, item) => {
  var parts = item.split('=');
  if (parts[0] !== "")
    result[parts[0]] = parts[1];
  return result;
}, {});

const serializeUrlParams = params => Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

const getUrlStringParams = hashMode =>  hashMode ? window.location.hash.substr(1) : window.location.search.substr(1);

const setUrlStringParams = (paramsString, hashMode) =>  {if (hashMode) window.location.hash = paramsString; else window.history.pushState({}, null, `?${paramsString}`);};

/**
 * Get all url params
 *
 * @param {boolean} hashMode Hash mode to select query or hash url param (default true)
 * @return {object}
 */
export const getUrlParams = (hashMode=true) => deserializeUrlParams(getUrlStringParams(hashMode));

/**
 * Set full url params
 *
 * @param {object} params  Params to serialize
 * @param {boolean} hashMode Hash mode to select query or hash url param (default false)
 */
export const setUrlParams = (params, hashMode=true) => setUrlStringParams(serializeUrlParams(params), hashMode);

/**
 * Get a specific url param
 *
 * @param {string} key The param key to return
 * @param {boolean} hashMode Hash mode to select query or hash url param (default false)
 * @return {string}
 */
export const getUrlParam = (key, hashMode=true) => getUrlParams(hashMode)[key];

/**
 * Set a specific url param
 *
 * @param {string} key The param key to set
 * @param {*} value The param value to set
 * @param {boolean} hashMode Hash mode to select query or hash url param (default false)
 */
export const setUrlParam = (key, value, hashMode=true) => {
  if (!key)
    return;
  let newParams = getUrlParams(hashMode);
  newParams[key] = value;
  setUrlParams(newParams, hashMode);
};
