// React
import React from 'react';

// Hook
import { useAutoFetchRoutesOnDate } from '../hooks/useAutoFetch';
import { useUrlHashParam } from '../hooks/useUrlHashParam';

// View
import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';

const now = (date = new Date()) => { date.setHours(0, 0, 0, 0); return date; };
const formatUrlDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const parseUrlDate = date => new Date(date.replace(/-/gi, '/'));

/**
 * Live view Component
 */
const LiveView = () => {
  const [routeId, setRouteId] = useUrlHashParam('route_id');
  const [hashDate, setHashDate] = useUrlHashParam('date');
  const date = hashDate ?  parseUrlDate(hashDate) : now();
  useAutoFetchRoutesOnDate(date.toISOString());
  return (
    <div className='mtf-view-container'>
      {routeId ?
        <RouteDetailLiveView routeId={routeId} onBackClick={() => setRouteId('')} /> :
        <RouteListLiveView selectedDate={date} onDateSelected={date => setHashDate(formatUrlDate(date))} onRouteSelected={routeId => setRouteId(routeId)} /> }
    </div>
  );
};

export default LiveView;
