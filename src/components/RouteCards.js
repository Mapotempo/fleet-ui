import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { globalRoutesInfoSelector, routesSelector } from '../selectors';

import { Panel, Glyphicon } from 'react-bootstrap';

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

export const TotalFinishedRouteCard = (/*props*/) => {
  const { t } = useTranslation();
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  let routes = useSelector(routesSelector);
  return <BasicRouteCard
    glyph='tasks'
    value={globalRoutesInfo.globalFinishedRoutes}
    info={t('card.finished_routes.info', {count: globalRoutesInfo.globalFinishedRoutes})}
    subinfo={t('card.finished_routes.subinfo', {count: routes.length - globalRoutesInfo.globalFinishedRoutes})}
    bsStyle='success'/>;
};

// ======================
// TOTAL FINISHED MISSION
// ======================

export const TotalFinishedMission = (/*props*/) => {
  const { t } = useTranslation();
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='flag'
    value={globalRoutesInfo.globalFinishedMissions}
    info={t('card.finished_missions.info', {count: globalRoutesInfo.globalFinishedMissions})}
    subinfo={t('card.finished_missions.subinfo', {count: globalRoutesInfo.globalMissions - globalRoutesInfo.globalFinishedMissions})}
    bsStyle='info'/>;
};

// =====================
// TOTAL DELAYED MISSION
// =====================

export const TotalDelayedCard = (/*props*/) => {
  const { t } = useTranslation();
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='time'
    value={globalRoutesInfo.globalMissionDelays.finished}
    info={t('card.delay_missions.info', {count: globalRoutesInfo.globalMissionDelays.finished})}
    subinfo={t('card.delay_missions.subinfo', {count: globalRoutesInfo.globalMissionDelays.planned})}
    bsStyle='warning'/>;
};

// ====================
// TOTAL UNDONE MISSION
// ====================

export const TotalUndoneMissionCard = (/*props*/) => {
  const { t } = useTranslation();
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  return <BasicRouteCard
    glyph='share'
    value={globalRoutesInfo.globalFinishedMissionsUndone}
    info={t('card.undone_missions.info', {count: globalRoutesInfo.globalFinishedMissionsUndone})}
    subinfo={t('card.undone_missions.subinfo', {count: globalRoutesInfo.globalFinishedMissions - globalRoutesInfo.globalFinishedMissionsUndone})}
    bsStyle='danger'/>;
};
