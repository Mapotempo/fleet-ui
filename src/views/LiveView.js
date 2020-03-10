import React from 'react';
import PropTypes from 'prop-types';

import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';

const propTypes = {
  routeId: PropTypes.string,
  onRouteSelected: PropTypes.func
};

const defaultProps = {
  onRouteSelected: () => {}
};

const LiveView = (props) => {
  if (props.routeId)
    return <RouteDetailLiveView routeId={props.routeId}> </RouteDetailLiveView>;
  return <RouteListLiveView onRouteSelected={props.onRouteSelected}></RouteListLiveView>;
};

LiveView.propTypes = propTypes;
LiveView.defaultProps = defaultProps;

export default LiveView;
