import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { routeInfoSelector } from '../selectors';
import { usersMapper } from '../selectors';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ProgressBar, Label, Badge } from 'react-bootstrap';
import MissionsList from './MissionList';

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
  const [wideScreen, setWideScreen] = useState(true);
  let usersMap = useSelector(usersMapper);
  // let routes = useSelector(state => props.routes.map(route => {
  //   return {...route, user: usersMap[route.user_id], routeInfo: routeInfoSelector(state, route.id)};
  // }));

  useEffect(() => {
    const reportWindowSize = () => {
      if (wideScreen != window.innerWidth < 767)
        setWideScreen(true);
      else if (wideScreen != window.innerWidth > 767)
        setWideScreen(false);
    };
    reportWindowSize();
    window.addEventListener('resize', reportWindowSize);
    return () => window.removeEventListener('resize', reportWindowSize);
  }, []);

  const columnsBase = [{
    dataField: 'name',
    text: 'Name',
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow'
  },
  {
    dataField: 'duration',
    text: 'Duration',
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow'
  },
  {
    dataField: '',
    isDummyField: true,
    text: 'Email',
    formatter: userEmailFormatter,
    formatExtraData: usersMap,
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow',
    wideScreenOnly: true
  },
  {
    dataField: 'user_phone',
    //isDummyField: true,
    text: 'Phone',
    formatter: userPhoneFormatter,
    formatExtraData: usersMap,
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow',
    wideScreenOnly: true
  },
  {
    dataField: 'routeInfoDeparture',
    isDummyField: true,
    text: 'Departures',
    formatter: statusFormatter,
    formatExtraData: 'departure',
    headerAlign: 'center',
    align: 'center',
    classes: 'route-list-column',
    headerClasses: 'route-list-column overflow'
  },
  {
    dataField: 'routeInfoMission',
    isDummyField: true,
    text: 'Missions',
    formatter: statusFormatter,
    formatExtraData: 'mission',
    headerAlign: 'center',
    align: 'center',
    classes: 'route-list-column',
    headerClasses: 'route-list-column overflow'
  }, {
    dataField: 'routeInfoRest',
    isDummyField: true,
    text: 'Rests',
    formatter: statusFormatter,
    formatExtraData: 'rest',
    headerAlign: 'center',
    align: 'center',
    classes: 'route-list-column',
    headerClasses: 'route-list-column overflow'
  },
  {
    dataField: 'routeInfoArrival',
    isDummyField: true,
    text: 'Arrivals',
    formatter: statusFormatter,
    formatExtraData: 'arrival',
    headerAlign: 'center',
    align: 'center',
    classes: 'route-list-column',
    headerClasses: 'route-list-column overflow'
  },
  {
    dataField: 'advancement',
    // isDummyField: true,
    text: 'Estimated Time Advancement',
    formatter: advancementFormatter,
    classes: 'route-list-column',
    headerClasses: 'route-list-column',
    wideScreenOnly: true
  },
  {
    dataField: 'eta',
    // isDummyField: true,
    text: 'Estimated Time Arrival (ETA)',
    formatter: ETAFormatter,
    classes: 'route-list-column',
    headerClasses: 'route-list-column',
    wideScreenOnly: true
  }
  ];

  let columns = columnsBase.filter((item) => !item.wideScreenOnly || item.wideScreenOnly == wideScreen);

  return <div className='route-list-container'>
    <BootstrapTable
      wrapperClasses="route-list-table-wrapper"
      headerWrapperClasses="route-list-table-head"
      headerClasses="route-list-header"
      keyField='id'
      data={props.routes}
      columns={columns}
      hover
      bordered={ false }
      pagination={ paginationFactory() }
      noDataIndication="No Route found"
      expandRow={{
        onlyOneExpanding: true,
        className: 'expanding-routes',
        renderer: expandFormater
      }}
    />
  </div>;
};

RoutesList.propTypes = propTypes;
RoutesList.defaultProps = defaultProps;

export default RoutesList;

// ========
// Formater
// ========
const userEmailFormatter = (cell, row, rowIndex, formatExtraData) => formatExtraData[row.user_id].email;
const userPhoneFormatter = (cell, row, rowIndex, formatExtraData) => formatExtraData[row.user_id].phone;
const statusFormatter = (cell, row, rowIndex, formatExtraData) => (<RouteStatusColors routeId={row.id} type={formatExtraData} withLabels withCount={false}/>);
const advancementFormatter = (cell, row) => (<Advancement routeId={row.id}/>);
const ETAFormatter = (cell, row) => (<ETA routeId={row.id}/>);

// ==================
// Formater Component
// ==================

const RouteStatusColors = ({routeId, type='mission', withCount=true, withLabels=false}) => {
  let routeInfo = useSelector(state => routeInfoSelector(state, routeId));
  if (!routeInfo && routeInfo[type])
    return;
  return routeInfo[type].colors.reduce((accumulator, color) => {
    accumulator.push(
      <Badge key={color.color} style={{ backgroundColor: color.color }}>
        {(withCount ? color.count : "") + (withLabels && withCount ? " - " : "") + (withLabels ? color.labels : "")}
      </Badge>);
    accumulator.push(" ");
    return accumulator;
  }, []);
};

const Advancement = ({routeId}) => {
  let routeInfo = useSelector(state => routeInfoSelector(state, routeId));
  return <ProgressBar style={{ margin: 0 }} now={routeInfo.advancing} label={`${routeInfo.advancing}%`} title={`${routeInfo.advancing}%`}/>;
};

const ETA = ({eta, routeId}) => {
  let routeInfo = useSelector(state => routeInfoSelector(state, routeId));
  var style = 'default';
  if (routeInfo.delay < 15)
    style = "success";
  else if (routeInfo.delay < 30)
    style = "warning";
  else if (routeInfo.delay < 60)
    style = "danger";
  return <Label bsStyle={style}>{new Date(routeInfo.eta).toLocaleString()}</Label>;
};

// =========
// ExpandRow
// =========

const expandFormater = row => <MissionsList
  missions={row.missions} />;
