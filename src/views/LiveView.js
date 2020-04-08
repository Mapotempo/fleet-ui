import React from 'react';

import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';

import { useUrlHashParam } from '../hooks/useUrlHashParam';

/**
 * Live view Component
 */
const LiveView = () => {
  let [hashRouteId, setHashRouteId] = useUrlHashParam('route_id');
  if (hashRouteId)
    return <RouteDetailLiveView routeId={hashRouteId}> </RouteDetailLiveView>;
  return <RouteListLiveView onRouteSelected={routeId => setHashRouteId(routeId)}></RouteListLiveView>;
};

export default LiveView;
