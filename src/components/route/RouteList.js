import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { routeInfoSelector } from '../../selectors';
import { usersMapper } from '../../selectors';

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
            <th style={{ textAlign: 'center' }}>Missions</th>
            <th style={{ textAlign: 'center' }}>Rest</th>
            <th style={{ textAlign: 'center' }}>Arrival</th>
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

const badgeGenerator = (colors, withTotal = true, withLabels = false, withCount = false) => {
  let res = colors.reduce((accumulator, color) => {
    accumulator.push(
      <Badge key={color.color} style={{ backgroundColor: color.color }}>
        {(withCount ? color.count : "") + (withLabels && withCount ? " - " : "") + (withLabels ? color.labels : "")}
      </Badge>);
    accumulator.push(" ");
    return accumulator;
  }, []);
  if (withTotal)
    res.push(<Badge key="total">{colors.length}</Badge>);
  else // Remove last space
    res.pop();
  return res;
};

const RouteItem = (props) => {
  //TODO: Check nullity of user and routeInfo
  let user = useSelector(usersMapper)[props.route.user_id];
  let routeInfo = useSelector(state => routeInfoSelector(state, props.route.id));

  var style = 'default';
  if (routeInfo.delay < 15)
    style = "success";
  else if (routeInfo.delay < 30)
    style = "warning";
  else if (routeInfo.delay < 60)
    style = "danger";

  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{user.email}</td>
      <td >{user.phone}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(routeInfo.departure.colors, false, true)}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(routeInfo.mission.colors, false, false, true)}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(routeInfo.rest.colors, false, true)}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(routeInfo.arrival.colors, false, true)}</td>
      <td ><ProgressBar style={{ margin: 0 }} now={routeInfo.advancing} label={`${routeInfo.advancing}%`} title={`${routeInfo.advancing}%`}/></td>
      <td ><Label bsStyle={style}>{new Date(routeInfo.eta).toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;
