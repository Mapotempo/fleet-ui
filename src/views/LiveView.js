import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RoutesList from '../components/route/RouteList';
import Pending from '../components/utils/pending';

import { fetchRoutes } from '../actions';

const LiveView = () => {
  const [mounted, setMounted] = useState(false);
  let routes = useSelector(state => state.fleet.routes.items);
  let isRoutesFetching = useSelector(state => state.fleet.routes.isFetching);
  const dispatch = useDispatch();

  if (!mounted) {
    dispatch(fetchRoutes());
  }
  
  useEffect(() => {
    if (!mounted)
      setMounted(true);
    const interval = setInterval(() => dispatch(fetchRoutes()), 20000);
    return () => clearInterval(interval);
  }, []);

  // if (isRoutesFetching)
  //   return (<Pending message='Loading routes'/>);

  return (
    <RoutesList routes={routes}/>
  );
};
    
export default LiveView;
