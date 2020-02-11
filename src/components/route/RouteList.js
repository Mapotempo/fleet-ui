import React from 'react';
import PropTypes from 'prop-types';
import { Table, ProgressBar, Label, Badge } from 'react-bootstrap';

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
    <Table hover responsive striped >
      <thead>
        <tr className='warning'>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th style={{ textAlign: 'center' }}>Undone</th>
          <th style={{ textAlign: 'center' }}>Done</th>
          <th style={{ textAlign: 'center' }}>Missions</th>
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
  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{props.route.user.email}</td>
      <td >{props.route.user.phone}</td>
      <td style={{textAlign: 'center'}}><Badge style={{backgroundColor: "red"}}>{props.route.info.doneCount}</Badge></td>
      <td style={{textAlign: 'center'}}><Badge style={{backgroundColor: "green"}}>{props.route.info.undoneCount}</Badge></td>
      <td style={{textAlign: 'center'}}><Badge>{props.route.missions.length}</Badge></td>
      <td ><ProgressBar style={{ margin: 0 }} now={props.route.info.advancing} label={`${props.route.info.advancing}%`} title={`${props.route.info.advancing}%`}/></td>
      <td ><Label bsStyle={style[Math.floor(Math.random() * style.length)]}>{new Date(props.route.info.eta).toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;
