import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Table, ProgressBar, Label, Badge, Pager } from 'react-bootstrap';

import { requestRoutesWithMissions } from '../../actions';

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
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const [page, setPage] = useState(0);
  let startSlicer = page * props.routePerPage;
  let endSlicer = (page + 1) * props.routePerPage;
  let slicedRoute = props.routes.slice(startSlicer, endSlicer);

  // if (!mounted)
  //   dispatch(requestRoutesWithMissions(slicedRoute.map(route => route.id)));

  // useEffect(() => {
  //   if (!mounted)
  //     setMounted(true);
  //   const interval = setInterval(()=>{}, 30000);
  //   return () => clearInterval(interval);
  // }, []);

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

const style = ['default', 'success', 'warning', 'danger'];
const RouteItem = (props) => {
  return (
    <tr>
      <td>{props.route.name}</td>
      <td>{props.route.user.email}</td>
      <td >{props.route.user.phone}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(props.route.info.colors.departure, false, true)}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(props.route.info.colors.mission, false, false, true)}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(props.route.info.colors.rest, false, true)}</td>
      <td style={{ textAlign: 'center' }}>{badgeGenerator(props.route.info.colors.arrival, false, true)}</td>
      <td ><ProgressBar style={{ margin: 0 }} now={props.route.info.advancing} label={`${props.route.info.advancing}%`} title={`${props.route.info.advancing}%`}/></td>
      <td ><Label bsStyle={style[Math.floor(Math.random() * style.length)]}>{new Date(props.route.info.eta).toLocaleString()}</Label></td>
    </tr>);
};

RouteItem.propTypes = routeItemPropTypes;
