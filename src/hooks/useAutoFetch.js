import { useEffect } from 'react';
import { fetchRoutesOnDates, fetchRoutesMissions } from '../actions';
import { useDispatch } from 'react-redux';

const TIMEOUT_INTERVAL_ROUTES = 30000; //ms
/**
 * Create a hook that automaticly fetch data
 *
 * @param {string} key The param key to observe
 * @return {[string, function]} A pair of value function on desire param
 */
export const useAutoFetchRoutesOnDate = (date, slidingDay=1) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let to = new Date(date);
    to.setDate(date.getDate() + slidingDay);
    dispatch(fetchRoutesOnDates(date, to));
    let handler = window.setInterval(() => {
      dispatch(fetchRoutesOnDates(date, to));
    }, TIMEOUT_INTERVAL_ROUTES);
    return () => window.clearInterval(handler);
  }, [date]);
};

const TIMEOUT_INTERVAL_ROUTES_MISSIONS = 120000; //ms
/**
 * Fetch
 *
 * @param {Array} routes The param key to observe
 */
export const useAutoFetchRoutesMissions = (routes) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoutesMissions(routes));
    let handler = window.setInterval(() => {
      dispatch(fetchRoutesMissions(routes));
    }, TIMEOUT_INTERVAL_ROUTES_MISSIONS);
    return () => window.clearInterval(handler);
  }, [routes]);
};
