import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
// import { fetchRoutes } from '../actions';

import MissionList from '../components/MissionList';

const propTypes = {
  routeId: PropTypes.string.isRequired
};

const RouteDetailLiveView = (props) => {
  let route = useSelector(state => state.fleet.routes.items.find(route => route.id === props.routeId));

  if (!route)
    return "route not found";
  return <MissionList missions={route.missions}></MissionList>;
};

RouteDetailLiveView.propTypes = propTypes;

export default RouteDetailLiveView;
