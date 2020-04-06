import React from 'react';
import PropTypes from 'prop-types';

import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';

import { useUrlHashParam } from '../lib/urlParams';

const propTypes = {
  routeId: PropTypes.string,
  onRouteSelected: PropTypes.func
};

const defaultProps = {
  onRouteSelected: () => {}
};

const LiveView = (props) => {
  let [hashRouteId, setHashRouteId] = useUrlHashParam('route_id');

  // let routeId = getUrlHashParam('route_id');
  if (hashRouteId)
    return <RouteDetailLiveView routeId={hashRouteId}> </RouteDetailLiveView>;
  return <RouteListLiveView onRouteSelected={routeId => setHashRouteId(routeId)}></RouteListLiveView>;
};

LiveView.propTypes = propTypes;
LiveView.defaultProps = defaultProps;

export default LiveView;
