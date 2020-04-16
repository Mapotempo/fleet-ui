import React from 'react';
import FleetGuard from './components/utils/guards';

// Expose i18n
export { default as i18n } from './locales';

// Expose Actions
export * from './actions';

// Expose Reducers
export { default as fleetReducer } from './reducers/rootReducer';

// Exposed Views
import _LiveView from './views/LiveView';
export const LiveView = () => (<FleetGuard><_LiveView></_LiveView></FleetGuard>);

import _RouteListLiveView from './views/RouteListLiveView';
export const RouteListLiveView = () => (<FleetGuard><_RouteListLiveView></_RouteListLiveView></FleetGuard>);

import _RouteDetailLiveView from './views/RouteDetailLiveView';
export const RouteDetailLiveView = () => (<FleetGuard><_RouteDetailLiveView></_RouteDetailLiveView></FleetGuard>);

// Exposed Style
export * from './index.scss';
