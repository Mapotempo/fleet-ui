import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Grid, Row, Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';

import { fetchRoutes, fetchWorkflow, fetchUsers } from '../actions';
import { routesSelector, missionsDowloadProgressSelector } from '../selectors';

import RoutesList from '../components/route/RouteList';
import Loader from '../components/utils/loader';
import DoughnutStatuses from '../components/route/DoughnutStatuses';

const propTypes = {
  routePerPage: PropTypes.number
};

const defaultProps = {
  routePerPage: 8
};

const LiveView = (props) => {
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  let routes = useSelector(routesSelector);
  let missionsDownloadProgress = useSelector(missionsDowloadProgressSelector);

  // Fetch Statuses
  let isFetchingRoute = useSelector(state => state.fleet.routes.isFetching);
  let isFetchingMST = useSelector(state => state.fleet.workflow.isFetchingMST);
  let isFetchingMAT = useSelector(state => state.fleet.workflow.isFetchingMAT);
  let isFetchingUser = useSelector(state => state.fleet.users.isFetching);

  if (!mounted) {
    dispatch(fetchRoutes());
    dispatch(fetchWorkflow());
    dispatch(fetchUsers());
  }

  useEffect(() => {
    if (!mounted)
      setMounted(true);
    const interval = setInterval(() => dispatch(fetchRoutes()), 120000);
    return () => clearInterval(interval);
  }, []);

  if (isFetchingMST || isFetchingMAT || isFetchingUser || (isFetchingRoute && routes.length === 0))
    return (<Loader message='Loading data' />);
  return (
    <div>
      <LoadingBar
        progress={missionsDownloadProgress}
        height={3}
        color='#00AAC2'
      />
      <Grid fluid>
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
        {/* <Row>
        <Col xs={12}>
          <ProgressBar active={missionsDownloadProgress < 100 ? true : false} bsStyle="info" now={missionsDownloadProgress}></ProgressBar>
        </Col>
      </Row> */}
        <Row>
          <Col xs={12}>
            <RoutesList routes={routes} routePerPage={props.routePerPage} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

LiveView.propTypes = propTypes;
LiveView.defaultProps = defaultProps;

export default LiveView;
