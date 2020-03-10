import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';
// import { routeInfoSelector } from '../../selectors';

import { Panel, Glyphicon } from 'react-bootstrap';

const BasicRouteCard = (props) => {
  return (
    <Panel bsStyle={props.style}>
      <Panel.Heading>
        <Panel.Title style={{overflow: 'hidden', display: 'block', height: 'auto'}}>
          <Glyphicon glyph={props.glyph} style={{fontSize: '4.5em', float: 'left'}}/>
          <div style={{textAlign: 'right', float: 'right '}}>
            <b  style={{margin: 0, fontSize: '2em'}}>{props.value}</b>
            <p  style={{margin: 0, fontSize: '1.2em'}}>{props.info}</p>
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
  glyph: 'info',
  value: [],
  info: '',
  subinfo: '',
  style: 'primary'
};

// ====================
// TOTAL ROUTE FINISHED
// ====================

const propTypes = {
  routes: PropTypes.array,
  header: PropTypes.string
};

const defaultProps = {
  routes: [],
  header: ''
};

export const TotalFinishedRouteCard = (props) => {
  return <BasicRouteCard
    value={3}
    info='tournées terminées'
    subinfo='5 planifiés'
    style='success'/>;
};

TotalFinishedRouteCard.propTypes = propTypes;
TotalFinishedRouteCard.defaultProps = defaultProps;

// ======================
// TOTAL FINISHED MISSION
// ======================

export const TotalFinishedMission = (props) => {
  return <BasicRouteCard
    value={3}
    info='missions terminées'
    subinfo='550 prévues'
    style='success'/>;
};

TotalFinishedMission.propTypes = propTypes;
TotalFinishedMission.defaultProps = defaultProps;

// =======================
// TOTAL DISTANCE TRAVELED
// =======================

export const TotalDistanceTraveledCard = (props) => {
  return <BasicRouteCard
    value={0}
    info='KM parcourue'
    subinfo='550 prévues'
    style='info'/>;
};

TotalDistanceTraveledCard.propTypes = propTypes;
TotalDistanceTraveledCard.defaultProps = defaultProps;

// =============
// TOTAL DELAYED
// =============

export const TotalDelayedCard = (props) => {
  return <BasicRouteCard
    value={5}
    info='tournées en retards'
    subinfo='3 de plus de 30min'
    style='warning'/>;
};

TotalDelayedCard.propTypes = propTypes;
TotalDelayedCard.defaultProps = defaultProps;
