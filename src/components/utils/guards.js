import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Jumbotron, Glyphicon } from 'react-bootstrap';

import Loader from './loader';

import { isReadyData } from '../../selectors';

// ====================
// FleetGuard Component
// ====================

const FleetGuard = (Component) => {
  let newFunc = (props) => {
    const { t } = useTranslation();

    let fleetStore = useSelector(state => state.fleet);
    if (!fleetStore)
      return (<div>ERROR: global store must be integrate fleet store !</div>);

    let isConnected = useSelector(state => state.fleet.auth.isConnected);
    let isFetchingAuth = useSelector(state => state.fleet.auth.isFetching);
    let isFetchingMST = useSelector(state => state.fleet.workflow.isFetchingMST);
    let isFetchingMAT = useSelector(state => state.fleet.workflow.isFetchingMAT);
    let isFetchingUser = useSelector(state => state.fleet.users.isFetching);
    let readyData = useSelector(isReadyData);

    let errors = useSelector(state => state.fleet.auth.errors);
    if (isFetchingAuth)
      return <Loader message={t('mapotempo_live_server_connection_pending')} />;
    if (isFetchingMST || isFetchingMAT || isFetchingUser)
      return (<Loader message={t('mapotempo_live_server_loading_data')} />);
    if (!isConnected || !readyData)
      return <NotConnected errors={errors ? errors.message : ''}/>;
    return (<div className="mtf-view-container"><Component {...props}/></div>);
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
  const { t } = useTranslation();

  return (
    <Jumbotron  className='mtf-view-container' style={{height: '100%', textAlign: 'center'}}>
      <p style={{ fontSize: '5em', color: '#d9534f' }} ><Glyphicon glyph="alert"/></p>

      <p>{t('mapotempo_live_server_unconnected')}</p>
      <p>{t('mapotempo_live_server_error')}: {props.errors}</p>
    </Jumbotron>);
};

NotConnected.propTypes = propTypes;
NotConnected.defaultProps = defaultProps;
