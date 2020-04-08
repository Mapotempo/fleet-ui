import { useState, useEffect } from 'react';
import {getUrlParam, setUrlParam} from '../lib/urlParams';

/**
 * Create a hook on selected url hash param
 *
 * @param {string} key The param key to observe
 * @return {[string, function]} A pair of value function on desire param
 */
export const useUrlHashParam = (key) => {
  const [param, setValue] = useState(getUrlParam(key));
  useEffect(() => {
    const handleHashChange = () => setValue(getUrlParam(key));
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const setParamValue = (newValue) => setUrlParam(key, newValue);
  return [param, setParamValue];
};
