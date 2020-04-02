import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Grid, Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';

import { fetchRoutes } from '../actions';
import { routesSelector, missionsDowloadProgressSelector } from '../selectors';

import RoutesList from '../components/RouteList';
import DoughnutStatuses from '../components/RouteDoughnutStatuses';
import { TotalFinishedRouteCard, TotalDelayedCard, TotalUndoneMissionCard, TotalFinishedMission } from '../components/RouteCards';

import DatePicker from "react-datepicker";


const propTypes = {
  onRouteSelected: PropTypes.func
};

const defaultProps = {
  onRouteSelected: () => {}
};

const RouteListLiveView = (props) => {
  const { t } = useTranslation();

  const [date, setDate] = useState(null);
  const dispatch = useDispatch();
  let routes = useSelector(routesSelector);
  let missionsDownloadProgress = useSelector(missionsDowloadProgressSelector);

  const handleChange = (value) => {
    let from = new Date(value);
    from.setUTCHours(0, 0, 0, 0);
    let to = new Date(from);
    to.setDate(from.getDate() + 1);
    setDate(from);
    dispatch(fetchRoutes(from, to));
  };

  if (!date) {
    handleChange(new Date());
  }
  return (
    <React.Fragment>
      <LoadingBar
        progress={missionsDownloadProgress}
        height={3}
        color='#00AAC2'
      />
      <Grid fluid>
        <Row className="mtf-dashboard-row">
          <Col xs={12}>
            <DatePicker
              selected={date}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mtf-dashboard-row">
          <Col md={3}>
            <TotalFinishedRouteCard />
          </Col>
          <Col md={3} xsHidden>
            <TotalFinishedMission />
          </Col>
          <Col md={3} xsHidden>
            <TotalDelayedCard />
          </Col>
          <Col md={3}>
            <TotalUndoneMissionCard />
          </Col>
        </Row>

        <Row className="mtf-dashboard-row">
          <Col md={4} xsHidden>
            <DoughnutStatuses
              routes={routes}
              missionType="departure"
              header={t("mapotempo_route_global_status_departure")}/>
          </Col>
          <Col md={4}>
            <DoughnutStatuses
              routes={routes}
              missionType="mission"
              header={t("mapotempo_route_global_status_missions")}/>
          </Col>
          <Col md={4} xsHidden>
            <DoughnutStatuses
              routes={routes}
              missionType="arrival"
              header={t("mapotempo_route_global_status_arrival")}/>
          </Col>
        </Row>

        <Row className="mtf-dashboard-row">
          <Col md={12}>
            <RoutesList
              routes={routes}
              expandable={false}
              onRouteSelected={props.onRouteSelected}
            />
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

RouteListLiveView.propTypes = propTypes;
RouteListLiveView.defaultProps = defaultProps;

export default RouteListLiveView;

