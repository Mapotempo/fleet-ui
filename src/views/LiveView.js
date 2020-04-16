import React from 'react';

import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';

import { useUrlHashParam } from '../hooks/useUrlHashParam';

/**
 * Live view Component
 */
const LiveView = () => {
  let [hashRouteId, setHashRouteId] = useUrlHashParam('route_id');
  return (
    <div className='mtf-view-container'>
      {hashRouteId ? <RouteDetailLiveView routeId={hashRouteId}> </RouteDetailLiveView> : <RouteListLiveView onRouteSelected={routeId => setHashRouteId(routeId)}></RouteListLiveView>}
    </div>
  );
};

export default LiveView;
