import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import {usersMapper} from '../selectors/userSelectors';
import MissionList from '../components/MissionList';
import { TotalDelayedCard,
  TotalUndoneMissionCard, TotalFinishedMissionCard, RouteInfosCard } from '../components/RouteCards';

import { Grid, Row, Col } from 'react-bootstrap';

const propTypes = {
  routeId: PropTypes.string.isRequired
};

const RouteDetailLiveView = (props) => {
  let route = useSelector(state => state.fleet.routes.items.find(route => route.id === props.routeId));
  let userMap = useSelector(usersMapper);

  if (!route)
    return "route not found";
  console.log('---------->', userMap);
  let user = userMap[route.user_id];
  console.log(user);
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
            <TotalFinishedMissionCard finishedMissions={5} totalMissions={6}/>
          </Col>
          <Col md={4} xsHidden>
            <TotalDelayedCard missionDelaysFinished={4} missionDelaysPlanned={3}/>
          </Col>
          <Col md={4}>
            <TotalUndoneMissionCard finishedMissionsUndone={2} finishedMissions={4}/>
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
