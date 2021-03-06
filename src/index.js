import React from 'react';
import FleetGuard from './components/utils/guards';

// Exose libs
export { default as sha256 } from './lib/sha256';

// Expose i18n
import i18n from './locales';
export const changeLocal = (local) => {
  i18n.changeLanguage(local);
};

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
export * from './styles/index.scss';
