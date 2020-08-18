// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAutoFetchRoutesMissions } from '../hooks/useAutoFetch';
import { useTranslation } from 'react-i18next';

// Component
import { UserInfos } from '../components/user/UserInfos';
import MissionList from '../components/mission/MissionList';
import { TotalDelayedCard,
  TotalUndoneMissionCard, TotalFinishedMissionCard
} from '../components/route/RouteCards';
import { Panel, Row, Col, Modal, Button } from 'react-bootstrap';
import MissionSurvey from '../components/mission/MissionSurvey';

const propTypes = {
  routeId: PropTypes.string.isRequired,
  onBackClick: PropTypes.func
};

const defaultProps = {
  onBackClick: () => {}
};

const RouteDetailLiveView = (props) => {
  const { t } = useTranslation();
  let route = useSelector(state => state.fleet.routes.items.find(route => route.id === props.routeId));

  const [modalInfo, setModalInfo] = useState(null);

  // Use auto fetch
  useAutoFetchRoutesMissions(route ? [route] : []);

  if (!route)
    return (
      <Row className="mtf-dashboard-row" >
        <Col md={12}>
          {t('route.route_not_found')}
        </Col>
      </Row>
    );

  const onMissionSurveyHandler = (mission, surveyType) => {
    setModalInfo({
      mission,
      surveyType
    });
  };

  return (
    <React.Fragment>
      {/* <Row className="mtf-dashboard-row" >
        <Col md={12}>
          <Header text={t('route.route_detail_title', { name: route.name })}
            onBackClick={props.onBackClick} />
        </Col>
      </Row> */}
      <Row className="mtf-dashboard-row">
        <Col md={12}>
          <Panel>
            <Panel.Body>
              <UserInfos userId={route.user_id} />
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
      <Row className="mtf-dashboard-row" >
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
            <MissionList route={route} onMissionSurveyClick={onMissionSurveyHandler}></MissionList>
          </Panel>
        </Col>
      </Row>
      <Modal show={ modalInfo != null} onHide={() => setModalInfo(null)}>
        {modalInfo ?
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-sm">{t(`mission.survey.${modalInfo.surveyType}.title`)}</Modal.Title>
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
    </React.Fragment>);
};

RouteDetailLiveView.propTypes = propTypes;
RouteDetailLiveView.defaultProps = defaultProps;

export default RouteDetailLiveView;
