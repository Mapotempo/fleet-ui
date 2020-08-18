// React
import React from 'react';

// Hook
import { useAutoFetchRoutesOnDate } from '../hooks/useAutoFetch';
import { useUrlHashParam } from '../hooks/useUrlHashParam';

// View
import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';

// Component
import { Grid, Row, Col } from 'react-bootstrap';
import RouteBreadcrumb from '../components/route/RouteBreadcrumb';
import { parseDashedDate, formatIsoDashedDate } from '../lib/dateUtils';

const now = (date = new Date()) => { date.setHours(0, 0, 0, 0); return date; };

/**
 * Live view Component
 */
const LiveView = () => {
  const [routeId, setRouteId] = useUrlHashParam('route_id');
  const [hashDate, setHashDate] = useUrlHashParam('date');
  const date = hashDate ?  parseDashedDate(hashDate) : now();
  useAutoFetchRoutesOnDate(date.toISOString());
  return (
    <Grid fluid className='mtf-view-container'>
      <Row className="mtf-dashboard-row" >
        <Col md={12}>
          <RouteBreadcrumb selectedDate={date} onDateSelected={date => setHashDate(formatIsoDashedDate(date))} routeId={routeId}  onBackClick={() => setRouteId('')}/>
        </Col>
      </Row>
      {routeId ?
        <RouteDetailLiveView routeId={routeId} /> :
        <RouteListLiveView onRouteSelected={routeId => setRouteId(routeId)} /> }
    </Grid>
  );
};

export default LiveView;
