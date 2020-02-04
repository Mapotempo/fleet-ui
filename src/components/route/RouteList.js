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
    <Table hover responsive>
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

const style = ['default', 'success', 'warning', 'danger'];
const RouteItem = (props) => {
  let fake = Math.floor(Math.random() * props.route.missions.length);
  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{props.route.user.email}</td>
      <td>{fake}</td>
      <td>{props.route.missions.length - fake}</td>
      <td>{props.route.missions.length}</td>
      <td ><ProgressBar style={{ margin: 0 }} now={props.route.info.advancing} label={`${props.route.info.advancing}%`} title={`${props.route.info.advancing}%`}/></td>
      <td ><Label bsStyle={style[Math.floor(Math.random() * style.length)]}>{new Date(props.route.info.eta).toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;
