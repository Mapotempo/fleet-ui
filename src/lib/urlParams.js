import { useState, useEffect } from 'react';

export const getUrlHashParams = () => {
  let hash = window.location.hash.substr(1) || '';
  return hash.split('&').reduce((result, item) => {
    var parts = item.split('=');
    if (parts[0] !== "")
      result[parts[0]] = parts[1];
    return result;
  }, {});
};

export const getUrlHashParam = (key) => {
  return getUrlHashParams()[key];
};

export const setUrlHashParam = (key, value) => {
  if (!key)
    return;
  let params =  getUrlHashParams();
  params[key] = value;
  window.location.hash = Object.entries(params).map(([key, value]) => `${key}=${value}`);
};

export const useUrlHashParam = (key) => {
  const [value, setValue] = useState(null);
  useEffect(() => {
    const handleHashChange = () => setValue(getUrlHashParam(key));
    window.addEventListener("hashchange", handleHashChange, false);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const setHashValue = (newValue) => setUrlHashParam(key, newValue);
  return [value, setHashValue];
};
