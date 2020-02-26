import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { routeInfoSelector } from '../../selectors';
import { usersMapper } from '../../selectors';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ProgressBar, Label, Badge } from 'react-bootstrap';

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
  let users = useSelector(usersMapper);
  let routes = useSelector(state => props.routes.map(route => {
    return {...route, user: users[route.user_id], routeInfo: routeInfoSelector(state, route.id)};
  }));

  const columns = [{
    dataField: 'name',
    text: 'Name'
  }, {
    dataField: 'user.email',
    text: 'Email'
  }, {
    dataField: 'user.phone',
    text: 'Phone'
  }, {
    dataField: 'routeInfo.departure.colors',
    text: 'Departures',
    formatter: departureFormater
  }, {
    dataField: 'routeInfo.mission.colors',
    text: 'Missions',
    formatter: missionFormater
  }, {
    dataField: 'routeInfo.rest.colors',
    text: 'Rests',
    formatter: restFormater
  }, {
    dataField: 'routeInfo.arrival.colors',
    text: 'Arrivals',
    formatter: arrivalFormater
  }, {
    dataField: 'routeInfo.advancing',
    text: 'Estimated Time Advancement',
    formatter: advancementFormater
  }, {
    dataField: 'routeInfo.eta',
    text: 'Estimated Time Arrival (ETA)',
    formatter: ETAFormater
  }];
  return <BootstrapTable
    keyField='id'
    data={routes}
    columns={columns}
    striped
    hover
    bordered={ false }
    pagination={ paginationFactory() }
  />;
};

RoutesList.propTypes = propTypes;
RoutesList.defaultProps = defaultProps;

export default RoutesList;

// ========
// Formater
// ========

const departureFormater = cell => <RouteBadges colors={cell} withLabels withCount={false}/>;
const missionFormater = cell => <RouteBadges colors={cell} />;
const restFormater = cell => <RouteBadges colors={cell} withLabels withCount={false}/>;
const arrivalFormater = cell => <RouteBadges colors={cell} withLabels withCount={false}/>;

const advancementFormater = cell => {
  return <ProgressBar style={{ margin: 0 }} now={cell} label={`${cell}%`} title={`${cell}%`}/>;
};

const ETAFormater = (cell, row) => {
  var style = 'default';
  if (row.routeInfo.delay < 15)
    style = "success";
  else if (row.routeInfo.delay < 30)
    style = "warning";
  else if (row.routeInfo.delay < 60)
    style = "danger";
  return <Label bsStyle={style}>{new Date(cell).toLocaleString()}</Label>;
};

const RouteBadges = ({colors, withCount=true, withLabels=false}) => {
  return colors.reduce((accumulator, color) => {
    accumulator.push(
      <Badge key={color.color} style={{ backgroundColor: color.color }}>
        {(withCount ? color.count : "") + (withLabels && withCount ? " - " : "") + (withLabels ? color.labels : "")}
      </Badge>);
    accumulator.push(" ");
    return accumulator;
  }, []);
};
