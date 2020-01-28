import FleetGuard from './components/utils/guards';

// Actions
export * from './actions';

// Reducers
export { default as fleetReducer } from './reducers/rootReducer';

// FleetMiddleware is a redux-thunk wrapper
export { default as fleetMiddleware } from 'redux-thunk';

// Components
import _UserListComponent from './components/user/user-list';
export const UserListComponent = FleetGuard(_UserListComponent);
