import React from 'react';
import PropTypes from 'prop-types';
import { Table, ProgressBar, Label } from 'react-bootstrap';

// ==========
// ROUTE ITEM
// ==========

const routeItemPropTypes = {
  route: PropTypes.object
};

const computeRouteInfo = (route) => {
  let actualDate = new Date();
  let sortedMissions = route.missions.sort((a, b) => (new Date(a.date) - new Date(b.date)));
  let lastMission = sortedMissions[route.missions.length - 1];
  let departureDate = new Date(route.date);
  let eta = new Date(lastMission.eta ? lastMission.eta : lastMission.date);
  let advancing = 0;
  if (actualDate > eta)
    advancing = 100;
  else if (actualDate > departureDate)
    advancing = Math.round(((actualDate - departureDate) / (eta - departureDate)) * 100);
  return {
    eta,
    advancing
  };
};

const style = ['default', 'success', 'warning', 'danger'];
const RouteItem = (props) => {
  console.log('begin');
  let routeInfo = computeRouteInfo(props.route);
  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{props.route.user_id}</td>
      <td>{props.route.missions.length}</td>
      <td ><ProgressBar style={{margin: 0}}now={routeInfo.advancing} label={`${routeInfo.advancing}%`} /></td>
      <td ><Label bsStyle={style[Math.floor(Math.random() * style.length)]}>{routeInfo.eta.toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;

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
