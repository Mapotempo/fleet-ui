import React from 'react';

import { useSelector } from 'react-redux';
import Pending from './pending';

const FleetGuard = (Component) => {
  var newFunc = (props) => {
    let fleetStore = useSelector(state => state.fleet);
    if (!fleetStore)
      return (<div>ERROR: global store must be integrate fleet store !</div>);

    let isConnected = useSelector(state => state.fleet.auth.isConnected);
    let isFetching = useSelector(state => state.fleet.auth.isFetching);
    if (isFetching)
      return (<Pending message='Mapotempo Live Server - connexion pending' />);
    if (!isConnected)
      return 'Not connected';
    return (<Component {...props}/>);
  };
  return newFunc;
};

export default FleetGuard;
