import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import Loader from './loader';

import { Jumbotron, Glyphicon } from 'react-bootstrap';

// ====================
// FleetGuard Component
// ====================

const FleetGuard = (Component) => {
  var newFunc = (props) => {
    let fleetStore = useSelector(state => state.fleet);
    if (!fleetStore)
      return (<div>ERROR: global store must be integrate fleet store !</div>);

    let isConnected = useSelector(state => state.fleet.auth.isConnected);
    let isFetching = useSelector(state => state.fleet.auth.isFetching);
    let errors = useSelector(state => state.fleet.auth.errors);
    if (isFetching)
      return <Loader message='Mapotempo Live Server - connexion pending'/>;
    if (!isConnected)
      return <NotConnected errors={errors ? errors.message : ''}/>;
    return (<Component {...props}/>);
  };
  return newFunc;
};

export default FleetGuard;

// ======================
// NotConnected Component
// ======================

const propTypes = {
  errors: PropTypes.string
};

const defaultProps = {
  errors: '',
};

const NotConnected = (props) => {
  return (
    <Jumbotron style={{textAlign: 'center'}}>
      <p style={{ fontSize: '5em', color: '#d9534f' }} ><Glyphicon glyph="alert"/></p>
      <p>Unconnected to Mapotempo Live Server</p>
      <p>Error: {props.errors}</p>
    </Jumbotron>);
};

NotConnected.propTypes = propTypes;
NotConnected.defaultProps = defaultProps;
