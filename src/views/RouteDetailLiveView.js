// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useSelector } from 'react-redux';
import { usersMapper } from '../selectors/userSelectors';
import { useAutoFetchRoutesMissions } from '../hooks/useAutoFetch';

// Component
import MissionList from '../components/MissionList';
import { TotalDelayedCard,
  TotalUndoneMissionCard, TotalFinishedMissionCard, RouteInfosCard } from '../components/RouteCards';
import { Grid, Row, Col } from 'react-bootstrap';

const propTypes = {
  routeId: PropTypes.string.isRequired,
};

const RouteDetailLiveView = (props) => {
  let route = useSelector(state => state.fleet.routes.items.find(route => route.id === props.routeId));
  let userMap = useSelector(usersMapper);

  // Use auto fetch
  useAutoFetchRoutesMissions(route ? [route] : []);

  if (!route)
    return "route not found";
  let user = userMap[route.user_id];
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
            <MissionList missions={route.missions}></MissionList>
          </Col>
        </Row>
      </Grid>
    </React.Fragment>);
};

RouteDetailLiveView.propTypes = propTypes;

export default RouteDetailLiveView;
