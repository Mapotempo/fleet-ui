import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { globalRoutesInfoSelector, routesSelector } from '../selectors';

import { Panel, Glyphicon } from 'react-bootstrap';

const BasicRouteCard = (props) => {
  return (
    <Panel bsStyle={props.style}>
      <Panel.Heading>
        <Panel.Title style={{overflow: 'hidden', display: 'block', height: 'auto'}}>
          <Glyphicon glyph={props.glyph} style={{fontSize: '4em', float: 'left'}}/>
          <div style={{textAlign: 'right', float: 'right '}}>
            <p style={{margin: 0, fontSize: '1em'}}>
              <b style={{margin: 0, fontSize: '2em'}}>{props.value}</b><br/>{props.info}
            </p>
          </div>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>{props.subinfo}</Panel.Body>
    </Panel>
  );
};

BasicRouteCard.propTypes = {
  glyph: PropTypes.string,
  value: PropTypes.number,
  info: PropTypes.string,
  subinfo: PropTypes.string,
  style: PropTypes.string
};
BasicRouteCard.defaultProps = {
  glyph: 'info-sign',
  value: [],
  info: '',
  subinfo: '',
  style: 'primary'
};

// ====================
// TOTAL ROUTE FINISHED
// ====================

export const TotalFinishedRouteCard = (/*props*/) => {
  let routesglobalRoutesInfo = useSelector(globalRoutesInfoSelector);
  let routes = useSelector(routesSelector);
  return <BasicRouteCard
    glyph='tasks'
    value={routesglobalRoutesInfo.globalFinishedRoutes}
    info='tournées terminées'
    subinfo={(routes.length - routesglobalRoutesInfo.globalFinishedRoutes) + ' restantes'}
    style='success'/>;
};

// ======================
// TOTAL FINISHED MISSION
// ======================

export const TotalFinishedMission = (/*props*/) => {
  let routesglobalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='flag'
    value={routesglobalRoutesInfo.globalFinishedMissions}
    info='missions terminées'
    subinfo={(routesglobalRoutesInfo.globalMissions - routesglobalRoutesInfo.globalFinishedMissions) + ' restantes'}
    style='info'/>;
};

// =============
// TOTAL DELAYED
// =============

export const TotalDelayedCard = (/*props*/) => {
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='time'
    value={globalRoutesInfo.globalMissionDelays.finished}
    info='missions en retard'
    subinfo={globalRoutesInfo.globalMissionDelays.planned + ' prevus en retard'}
    style='warning'/>;
};

// =======================
// TOTAL DISTANCE TRAVELED
// =======================

export const TotalUndoneMissionCard = (/*props*/) => {
  let routesglobalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='share'
    value={routesglobalRoutesInfo.globalFinishedMissionsUndone}
    info='anomalies'
    subinfo={routesglobalRoutesInfo.globalFinishedMissions - routesglobalRoutesInfo.globalFinishedMissionsUndone + ' sans anomalies'}
    style='danger'/>;
};

// =======================
// TOTAL DISTANCE TRAVELED
// =======================

export const TotalDistanceTraveledCard = (/*props*/) => {
  let routesglobalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='road'
    value={routesglobalRoutesInfo.globalDistanceReal}
    info='KM parcourue'
    subinfo={Math.round(routesglobalRoutesInfo.globalDistancePlanned / 1000) + ' prévues'}
    style='info'/>;
};
