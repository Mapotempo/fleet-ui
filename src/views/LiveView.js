// React
import React from 'react';

// Hook
import { useAutoFetchRoutesOnDate } from '../hooks/useAutoFetch';
import { useUrlHashParam } from '../hooks/useUrlHashParam';

// View
import RouteDetailLiveView from './RouteDetailLiveView';
import RouteListLiveView from './RouteListLiveView';


const formatUrlDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const purifyDate = (date) => {date.setHours(0,0,0,0); return date;};

/**
 * Live view Component
 */
const LiveView = () => {
  let [routeId, setRouteId] = useUrlHashParam('route_id');
  let [date, setDate] = useUrlHashParam('date');
  let fetchDate = date ? new Date(date) : purifyDate(new Date());
  useAutoFetchRoutesOnDate(fetchDate);
  return (
    <div className='mtf-view-container'>
      {routeId ?
        <RouteDetailLiveView routeId={routeId} /> :
        <RouteListLiveView selectedDate={fetchDate} onDateSelected={date => setDate(formatUrlDate(date))} onRouteSelected={routeId => setRouteId(routeId)} />}
    </div>
  );
};

export default LiveView;
