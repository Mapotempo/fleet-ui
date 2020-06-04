// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { usersMapper } from '../selectors/userSelectors';
import { useAutoFetchRoutesMissions } from '../hooks/useAutoFetch';
import { useTranslation } from 'react-i18next';

// Component
import MissionList from '../components/mission/MissionList';
import { TotalDelayedCard,
  TotalUndoneMissionCard, TotalFinishedMissionCard, RouteInfosCard } from '../components/route/RouteCards';
import { Panel, Grid, Row, Col, Modal, Button } from 'react-bootstrap';
import MissionSurvey from '../components/mission/MissionSurvey';

const propTypes = {
  routeId: PropTypes.string.isRequired,
};

const RouteDetailLiveView = (props) => {
  const { t } = useTranslation();
  let route = useSelector(state => state.fleet.routes.items.find(route => route.id === props.routeId));
  let userMap = useSelector(usersMapper);
  const [modalInfo, setModalInfo] = useState(null);

  // Use auto fetch
  useAutoFetchRoutesMissions(route ? [route] : []);

  if (!route)
    return "route not found";
  let user = userMap[route.user_id];

  const onMissionSurveyHandler = (mission, surveyType) => {
    setModalInfo({
      mission,
      surveyType
    });
  };

  return (
    <React.Fragment>
      <Grid fluid>
        <Row className="mtf-dashboard-row">
          <Col md={12}>
            <RouteInfosCard route={route} user={user}/>
          </Col>
        </Row>
        <Row className="mtf-dashboard-row">
          <Col md={4} xsHidden>
            <TotalFinishedMissionCard finishedMissions={route.extraInfo.finishedMissions} totalMissions={route.missions.length}/>
          </Col>
          <Col md={4} xsHidden>
            <TotalDelayedCard missionDelaysFinished={route.extraInfo.finishedMissionsDelay.overLowThreashold + route.extraInfo.finishedMissionsDelay.overHightThreashold} missionDelaysPlanned={route.extraInfo.plannedMissionsDelay.overLowThreashold + route.extraInfo.plannedMissionsDelay.overHightThreashold}/>
          </Col>
          <Col md={4}>
            <TotalUndoneMissionCard finishedMissionsUndone={route.extraInfo.finishedMissionsUndone} finishedMissions={route.extraInfo.finishedMissions}/>
          </Col>
        </Row>
        <Row className="mtf-dashboard-row">
          <Col md={12}>
            <Panel>
              <MissionList missions={route.missions} onMissionSurveyClick={onMissionSurveyHandler}></MissionList>
            </Panel>
          </Col>
        </Row>
        <Modal show={ modalInfo != null} onHide={() => setModalInfo(null)}>
          {modalInfo ?
            <React.Fragment>
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-sm">{t(`mission.survey.${modalInfo.surveyType}`)}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <MissionSurvey mission={modalInfo.mission} surveyType={modalInfo.surveyType}></MissionSurvey>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setModalInfo(null)}>{t("close")}</Button>
              </Modal.Footer>
            </React.Fragment>
            : null}
        </Modal>
      </Grid>
    </React.Fragment>);
};

RouteDetailLiveView.propTypes = propTypes;

export default RouteDetailLiveView;
