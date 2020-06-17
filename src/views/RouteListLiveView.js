// React
import React from 'react';
import PropTypes from 'prop-types';

// Hook
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAutoFetchRoutesMissions } from '../hooks/useAutoFetch';

// Reselect
import { routesSelector, globalRoutesInfoSelector, missionsDowloadProgressSelector } from '../selectors';

// Component
import { Title } from '../components/utils/title';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import RoutesList from '../components/route/RouteList';
import DoughnutStatuses from '../components/route/RouteDoughnutStatuses';
import { TotalFinishedRouteCard, TotalDelayedCard,
  TotalUndoneMissionCard, TotalFinishedMissionCard } from '../components/route/RouteCards';
import DatePicker from "../components/utils/datepicker";

const propTypes = {
  onDateSelected: PropTypes.func,
  onRouteSelected: PropTypes.func,
  selectedDate: PropTypes.object
};

const defaultProps = {
  onDateSelected: () => {},
  onRouteSelected: () => {},
  selectedDate: new Date()
};

const RouteListLiveView = (props) => {
  const { t, i18n} = useTranslation();
  let routes = useSelector(routesSelector);
  let globalRoutesInfo = useSelector(globalRoutesInfoSelector);
  let missionsDownloadProgress = useSelector(missionsDowloadProgressSelector);

  // Use auto fetch
  useAutoFetchRoutesMissions(routes);

  const handleChange = (value) => props.onDateSelected(value);

  return (
    <React.Fragment>
      <LoadingBar
        progress={missionsDownloadProgress}
        height={3}
        color='#00AAC2'
      />
      <Grid fluid>
        <Row className="mtf-dashboard-row" >
          <Col md={12}>
            <Title text={t('route.routes_list_title',
              { date: props.selectedDate.toLocaleDateString(i18n.language) })} />
          </Col>
          <Col md={2}>
            <DatePicker
              initialDate={props.selectedDate}
              onChangeDate={handleChange}
            />
          </Col>
        </Row>
        <Row className="mtf-dashboard-row">
          <Col md={3}>
            <TotalFinishedRouteCard finishedRoutes={globalRoutesInfo.globalFinishedRoutes} totalRoutes={routes.length} />
          </Col>
          <Col md={3} xsHidden>
            <TotalFinishedMissionCard finishedMissions={globalRoutesInfo.globalFinishedMissions} totalMissions={globalRoutesInfo.globalMissions}/>
          </Col>
          <Col md={3} xsHidden>
            <TotalDelayedCard missionDelaysFinished={globalRoutesInfo.globalMissionDelays.finished} missionDelaysPlanned={globalRoutesInfo.globalMissionDelays.planned}/>
          </Col>
          <Col md={3}>
            <TotalUndoneMissionCard finishedMissionsUndone={globalRoutesInfo.globalFinishedMissionsUndone} finishedMissions={globalRoutesInfo.globalFinishedMissions}/>
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
            <Panel>
              <RoutesList
                routes={routes}
                expandable={false}
                onRouteSelected={props.onRouteSelected}
              />
            </Panel>
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

RouteListLiveView.propTypes = propTypes;
RouteListLiveView.defaultProps = defaultProps;

export default RouteListLiveView;

