import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

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
  routes: PropTypes.array,
  expandable: PropTypes.bool,
  onRouteSelected: PropTypes.func
};

const defaultProps = {
  routes: [],
  expandable: false,
  onRouteSelected: () => {}
};

const RoutesList = (props) => {
  const { t } = useTranslation();
  const [wideScreen, setWideScreen] = useState(true);
  let usersMap = useSelector(usersMapper);

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
    text: t('mapotempo_route_name'),
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow',
    sort: true
  },
  {
    dataField: 'user_email',
    href: 'totototo',
    isDummyField: true,
    text: t('mapotempo_route_email'),
    formatter: userEmailFormatter,
    formatExtraData: usersMap,
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow',
    wideScreenOnly: true,
    sort: true
  },
  {
    dataField: 'user_phone',
    isDummyField: true,
    text: t('mapotempo_route_phone'),
    formatter: userPhoneFormatter,
    formatExtraData: usersMap,
    classes: 'route-list-column overflow',
    headerClasses: 'route-list-column overflow',
    wideScreenOnly: true,
    sort: true
  },
  {
    dataField: 'routeInfoDeparture',
    isDummyField: true,
    text: t('mapotempo_route_departure'),
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
    text: t('mapotempo_route_missions'),
    formatter: missionStatusFormatter,
    formatExtraData: 'mission',
    headerAlign: 'center',
    align: 'center',
    classes: 'route-list-column',
    headerClasses: 'route-list-column overflow'
  }, {
    dataField: 'routeInfoRest',
    isDummyField: true,
    text: t('mapotempo_route_rests'),
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
    text: t('mapotempo_route_arrivals'),
    formatter: statusFormatter,
    formatExtraData: 'arrival',
    headerAlign: 'center',
    align: 'center',
    classes: 'route-list-column',
    headerClasses: 'route-list-column overflow'
  },
  {
    dataField: 'advancement',
    isDummyField: true,
    text: t('mapotempo_route_estimated_advancement'),
    formatter: advancementFormatter,
    classes: 'route-list-column',
    headerClasses: 'route-list-column',
    wideScreenOnly: true
  },
  {
    dataField: 'eta',
    isDummyField: true,
    text: t('mapotempo_route_estimated_time_arrival'),
    formatter: ETAFormatter,
    classes: 'route-list-column',
    headerClasses: 'route-list-column',
    wideScreenOnly: true
  }
  ];

  let columns = columnsBase.filter((item) => !item.wideScreenOnly || item.wideScreenOnly == wideScreen);

  const rowEvents = {
    onClick: (e, row) => {
      props.onRouteSelected(row.id);
    },
    onMouseEnter: (/*e, row, rowIndex */) => {    }
  };

  return <BootstrapTable
    wrapperClasses="route-list-table-wrapper"
    headerWrapperClasses="route-list-table-head"
    headerClasses="route-list-header"
    rowClasses="route-list-row"
    keyField='id'
    data={props.routes}
    columns={columns}
    hover
    bordered={ false }
    pagination={ paginationFactory() }
    noDataIndication="No Route found"
    expandRow={{
      onlyOneExpanding: true,
      className: 'route-expanding',
      renderer: props.expandable ?  expandFormater : null
    }}
    rowEvents={ rowEvents }
  />;
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
const missionStatusFormatter = (cell, row, rowIndex, formatExtraData) => (<RouteStatusColors routeId={row.id} type={formatExtraData}/>);
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

Advancement.propTypes = {routeId: PropTypes.string};

const ETA = ({routeId}) => {
  let routeInfo = useSelector(state => routeInfoSelector(state, routeId));
  let style = 'default';
  if (routeInfo.delay < 15)
    style = "success";
  else if (routeInfo.delay < 30)
    style = "warning";
  else if (routeInfo.delay < 60)
    style = "danger";
  return <Label bsStyle={style}>{new Date(routeInfo.eta).toLocaleString()}</Label>;
};

ETA.propTypes = {routeId: PropTypes.string};

// =========
// ExpandRow
// =========

const expandFormater = row =>
  <div style={{height: '370px'}}>
    <MissionsList
      missions={row.missions} />;
  </div>;
