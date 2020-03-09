import React, { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';

import { fetchRoutes } from '../actions';
import { routesSelector, missionsDowloadProgressSelector } from '../selectors';

import RoutesList from '../components/RouteList';
import DoughnutStatuses from '../components/DoughnutStatuses';

import DatePicker from "react-datepicker";

const LiveView = () => {
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
        <Row>
          <Col xs={12}>
            <DatePicker
              selected={date}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="show-grid" style={{padding: '20px'}}>
          <Col xs={6} md={4}>
            <DoughnutStatuses
              routes={routes}
              missionType="departure"
              header="Global Departure"/>
          </Col>
          <Col xs={6} md={4}>
            <DoughnutStatuses
              routes={routes}
              missionType="mission"
              header="Global Mission"/>
          </Col>
          <Col xs={6} md={4}>
            <DoughnutStatuses
              routes={routes}
              missionType="arrival"
              header="Global Arrival" />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RoutesList
              routes={routes}
              locale="fr"
            />
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

export default LiveView;

