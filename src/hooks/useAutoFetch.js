import { useEffect } from 'react';
import { fetchRoutesOnDates, fetchRoutesMissions } from '../actions';
import { useDispatch } from 'react-redux';

const TIMEOUT_INTERVAL_ROUTES = 30000; //ms
/**
 * useAutoFetchRoutesOnDate
 * Trigger routes fetch on TIMEOUT_INTERVAL_ROUTES_MISSIONS times interval
 * (without missions detail)
 *
 * @param {string} key date to fetch
 * @param {string} slidingDay sliding day default 1
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
 * useAutoFetchRoutesMissions
 * Trigger routes fetch on TIMEOUT_INTERVAL_ROUTES_MISSIONS times interval
 * (with missions details)
 *
 * @param {Array} routes The param key to observe
 */
export const useAutoFetchRoutesMissions = (routes) => {
  // Do not use routes to trigger useEffect cb to prevent infinit loop
  // (route is immutable and realocate on every fetch)
  let routesIDS = routes.reduce((accumulator, route) => {
    return accumulator + route.id;
  }, "");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRoutesMissions(routes));
    let handler = window.setInterval(() => {
      dispatch(fetchRoutesMissions(routes));
    }, TIMEOUT_INTERVAL_ROUTES_MISSIONS);
    return () => window.clearInterval(handler);
  }, [routesIDS]);
};
