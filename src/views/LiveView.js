// React
import React from 'react';

// Hook
import { useAutoFetchRoutesOnDate } from '../hooks/useAutoFetch';
import { useUrlHashParam } from '../hooks/useUrlHashParam';

// View
import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';


const purifyDate = (date) => {
  date = new Date(date);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

/**
 * Live view Component
 */
const LiveView = () => {
  let [routeId, setRouteId] = useUrlHashParam('route_id');
  let [date, setDate] = useUrlHashParam('date');
  let fetchDate = purifyDate(date ? new Date(date) : new Date());

  useAutoFetchRoutesOnDate(fetchDate);

  return (
    <div className='mtf-view-container'>
      {routeId ?
        <RouteDetailLiveView routeId={routeId} /> :
        <RouteListLiveView selectedDate={fetchDate} onDateSelected={date => setDate(date.toISOString())} onRouteSelected={routeId => setRouteId(routeId)} />}
    </div>
  );
};

export default LiveView;
