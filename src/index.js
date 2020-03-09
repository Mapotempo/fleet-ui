import FleetGuard from './components/utils/guards';

// Expose i18n
export { default as i18n } from './locales';

// Expose Actions
export * from './actions';

// Expose Reducers
export { default as fleetReducer } from './reducers/rootReducer';

// Expose Views
import _LiveView from './views/LiveView';
export const LiveView = FleetGuard(_LiveView);

