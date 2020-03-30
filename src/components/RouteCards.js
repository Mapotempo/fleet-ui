import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  let routes = useSelector(routesSelector);
  return <BasicRouteCard
    glyph='tasks'
    value={globalRoutesInfo.globalFinishedRoutes}
    info={t('card.finished_routes.info', {count: globalRoutesInfo.globalFinishedRoutes})}
    subinfo={t('card.finished_routes.subinfo', {count: routes.length - globalRoutesInfo.globalFinishedRoutes})}
    style='success'/>;
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

    style='info'/>;
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
    style='warning'/>;
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
    style='danger'/>;
};
