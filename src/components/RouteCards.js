// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useTranslation } from 'react-i18next';

// Component
import { Panel, Glyphicon, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col } from 'react-bootstrap';

const BasicRouteCard = (props) => {
  return (
    <Panel bsStyle={props.bsStyle} className='mtf-card'>
      <Panel.Heading>
        <Panel.Title>
          <Glyphicon glyph={props.glyph} className='mtf-card-icon'/>
          <p className='mtf-card-value'>{props.value}</p>
          <p className='mtf-card-title' title={props.info}>
            {props.info}
          </p>
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
  bsStyle: PropTypes.string
};

BasicRouteCard.defaultProps = {
  glyph: 'info-sign',
  value: [],
  info: '',
  subinfo: '',
  bsStyle: 'primary'
};

// ====================
// TOTAL ROUTE FINISHED
// ====================

export const TotalFinishedRouteCard = React.memo(props => {
  const { t } = useTranslation();
  return <BasicRouteCard
    glyph='tasks'
    value={props.finishedRoutes}
    info={t('card.finished_routes.info', {count: props.finishedRoutes})}
    subinfo={t('card.finished_routes.subinfo', {count: props.totalRoutes - props.finishedRoutes})}
    bsStyle='success'/>;
});

TotalFinishedRouteCard.propTypes = {
  finishedRoutes: PropTypes.number,
  totalRoutes: PropTypes.number
};

// ======================
// TOTAL FINISHED MISSION
// ======================

export const TotalFinishedMissionCard = React.memo(props => {
  const { t } = useTranslation();
  return <BasicRouteCard
    glyph='flag'
    value={props.finishedMissions}
    info={t('card.finished_missions.info', {count: props.finishedMissions})}
    subinfo={t('card.finished_missions.subinfo', {count: props.totalMissions - props.finishedMissions})}
    bsStyle='info'/>;
});

TotalFinishedMissionCard.propTypes = {
  finishedMissions: PropTypes.number,
  totalMissions: PropTypes.number
};

// =====================
// TOTAL DELAYED MISSION
// =====================

export const TotalDelayedCard = React.memo(props => {
  const { t } = useTranslation();
  return <BasicRouteCard
    glyph='time'
    value={props.missionDelaysFinished}
    info={t('card.delay_missions.info', {count: props.missionDelaysFinished})}
    subinfo={t('card.delay_missions.subinfo', {count: props.missionDelaysPlanned})}
    bsStyle='warning'/>;
});

TotalDelayedCard.propTypes = {
  missionDelaysFinished: PropTypes.number,
  missionDelaysPlanned: PropTypes.number,
};

// ====================
// TOTAL UNDONE MISSION
// ====================

export const TotalUndoneMissionCard = React.memo(props => {
  const { t } = useTranslation();
  return <BasicRouteCard
    glyph='share'
    value={props.finishedMissionsUndone}
    info={t('card.undone_missions.info', {count: props.finishedMissionsUndone})}
    subinfo={t('card.undone_missions.subinfo', {count: props.finishedMissions - props.finishedMissionsUndone})}
    bsStyle='danger'/>;
});

TotalUndoneMissionCard.propTypes = {
  finishedMissionsUndone: PropTypes.number,
  finishedMissions: PropTypes.number,
};

// ====================
// TOTAL UNDONE MISSION
// ====================

export const RouteInfosCard = (props) => {
  let globalDelay = 0;
  if (props.route.extraInfo.plannedMissionsDelay.overHightThreashold)
    globalDelay = 30;
  else if (props.route.extraInfo.plannedMissionsDelay.overLowThreashold)
    globalDelay = 15;
  return (
    <Panel className='mtf-card' bsStyle='success'>
      <Panel.Heading>
        <Panel.Title>
          Tournée : {props.route.name}
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Form horizontal>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>missions
            </Col>
            <Col sm={10}>
              <FormControl disable value={props.route.missions.length}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>créneaux
            </Col>
            <Col sm={10}>
              <FormControl disable value={new Date(props.route.date).toLocaleString() + ' - ' + new Date(props.route.extraInfo.routeArrivalDate).toLocaleString()}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>Retard global
            </Col>
            <Col sm={10}>
              <FormControl disable value={globalDelay + " min"}/>
            </Col>
          </FormGroup>
        </Form>
      </Panel.Body>
    </Panel>
  );
};

RouteInfosCard.propTypes = {
  route: PropTypes.object,
  user: PropTypes.object
};
