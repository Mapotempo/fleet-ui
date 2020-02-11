import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Table, ProgressBar, Label, Badge, Pager } from 'react-bootstrap';

// ==========
// ROUTE LIST
// ==========

const propTypes = {
  routes: PropTypes.array,
  routePerPage: PropTypes.number
};

const defaultProps = {
  routes: [],
  routePerPage: 8
};

const RoutesList = (props) => {
  const [page, setPage] = useState(0);
  let startSlicer = page * props.routePerPage;
  let endSlicer = (page + 1) * props.routePerPage;
  let slicedRoute = props.routes.slice(startSlicer, endSlicer);

  return (
    <div>
      <Table hover responsive striped >
        <thead>
          <tr className='info'>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ textAlign: 'center' }}>Departure</th>
            <th style={{ textAlign: 'center' }}>Arrival</th>
            <th style={{ textAlign: 'center' }}>Rest</th>
            <th style={{ textAlign: 'center' }}>Missions</th>
            <th>Estimated Time Advancement</th>
            <th>Estimated Time Arrival (ETA)</th>
          </tr>
        </thead>
        <tbody>
          {
            slicedRoute.map((route) => <RouteItem key={route.id} route={route}></RouteItem>)
          }
        </tbody>
      </Table>
      <Pager>
        <Pager.Item disabled={startSlicer===0} onClick={()=>setPage(page - 1)}>Previous</Pager.Item>{' '}
        <Pager.Item disabled={endSlicer>=props.routes.length} onClick={()=>setPage(page + 1)}>Next</Pager.Item>
      </Pager>
    </div>
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
  let departureStatus = props.route.info.departure.doneCount > props.route.info.departure.undoneCount;
  let arrivalStatus = props.route.info.departure.doneCount > props.route.info.arrival.undoneCount;
  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{props.route.user.email}</td>
      <td >{props.route.user.phone}</td>
      <td style={{ textAlign: 'center' }}>
        <Label bsStyle={arrivalStatus ? "success" : "danger"}>{departureStatus ? "Done" : "Undone"}</Label>
      </td>
      <td style={{ textAlign: 'center' }}>
        <Label bsStyle={arrivalStatus ? "success" : "danger"}>{arrivalStatus ? "Done" : "Undone"}</Label>
      </td>
      <td style={{ textAlign: 'center' }}>
        <Badge style={{ backgroundColor: "red" }}>{props.route.info.rest.doneCount}</Badge>
        {" "}
        <Badge style={{ backgroundColor: "green" }}>{props.route.info.rest.undoneCount}</Badge>
      </td>
      <td style={{ textAlign: 'center' }}>
        <Badge style={{ backgroundColor: "red" }}>{props.route.info.mission.doneCount}</Badge>
        {" "}
        <Badge style={{ backgroundColor: "green" }}>{props.route.info.mission.undoneCount}</Badge>
        {" "}
        <Badge>{props.route.missions.length}</Badge>
      </td>
      <td ><ProgressBar style={{ margin: 0 }} now={props.route.info.advancing} label={`${props.route.info.advancing}%`} title={`${props.route.info.advancing}%`}/></td>
      <td ><Label bsStyle={style[Math.floor(Math.random() * style.length)]}>{new Date(props.route.info.eta).toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;
