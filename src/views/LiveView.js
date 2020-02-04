import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import RoutesList from '../components/route/RouteList';
import Loader from '../components/utils/loader';

import { fetchRoutes, fetchWorkflow, fetchUsers } from '../actions';

import { routesFullInfo } from '../selectors';

const LiveView = () => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  let routes = useSelector(routesFullInfo);
  let isFetchingMST = useSelector(state => state.fleet.workflow.isFetchingMST);
  let isFetchingMAT = useSelector(state => state.fleet.workflow.isFetchingMAT);
  let isFetchingUser = useSelector(state => state.fleet.users.isFetching);

  if (!mounted) {
    dispatch(fetchRoutes());
    dispatch(fetchWorkflow());
    dispatch(fetchUsers());
  }
  
  useEffect(() => {
    if (!mounted)
      setMounted(true);
    const interval = setInterval(() => dispatch(fetchRoutes()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (isFetchingMST || isFetchingMAT || isFetchingUser)
    return (<Loader message='Loading data'/>);

  return (<RoutesList routes={routes} />);
};
    
export default LiveView;
