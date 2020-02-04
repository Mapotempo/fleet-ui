import React from 'react';
import PropTypes from 'prop-types';
import { Table, ProgressBar, Label } from 'react-bootstrap';

// ==========
// ROUTE LIST
// ==========

const propTypes = {
  routes: PropTypes.array
};

const defaultProps = {
  routes: [],
};

const RoutesList = (props) => {
  return (
    <Table hover condensed responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Undone</th>
          <th>Done</th>
          <th>Missions Count</th>
          <th>Estimated Time Advancement</th>
          <th>Estimated Time Arrival (ETA)</th>
        </tr>
      </thead>
      <tbody>
        {
          props.routes.map((route) => <RouteItem key={route.id} route={route}></RouteItem>)
        }
      </tbody>
    </Table>
  );
};

RoutesList.propTypes = propTypes;
RoutesList.defaultProps = defaultProps;

export default RoutesList;

// ==========
// ROUTE ITEM
// ==========

const routeItemPropTypes = {
  route: PropTypes.object
};

const computeAdvancing = (actualDate, departureDate, eta) => {
  if (actualDate > eta)
    return 100;
  else if (actualDate > departureDate)
    return Math.round(((actualDate - departureDate) / (eta - departureDate)) * 100);
  else
    return 0;
};

const computeRouteInfo = (route) => {
  let actualDate = new Date();
  return route.missions.reduce((accumulator, currentValue) => {
    // Choosed the better ETA source
    let currentEtaValue = currentValue.eta ? currentValue.eta : currentValue.date;
    if (currentEtaValue > accumulator.eta)
    {
      accumulator.eta = currentEtaValue;
      accumulator.advancing = computeAdvancing(actualDate, new Date(accumulator.departure), new Date(accumulator.eta));
    }
    return accumulator;
  },
  {
    advancing: 0,
    departure: route.date,
    eta: '1970-01-01T00:00:00.000'
  });
};

const style = ['default', 'success', 'warning', 'danger'];
const RouteItem = (props) => {
  let routeInfo = computeRouteInfo(props.route);
  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{props.route.user_id}</td>
      <td></td>
      <td></td>
      <td>{props.route.missions.length}</td>
      <td ><ProgressBar style={{ margin: 0 }} now={routeInfo.advancing} label={`${routeInfo.advancing}%`} title={`${routeInfo.advancing}%`}/></td>
      <td ><Label bsStyle={style[Math.floor(Math.random() * style.length)]}>{new Date(routeInfo.eta).toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;
