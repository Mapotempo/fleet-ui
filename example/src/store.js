import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { fleetReducer } from 'fleet-ui';
import appReducer from './reducer/appReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
  // fleet: fleetReducer('http://localhost:8084/'),
  fleet: fleetReducer('https://fleet.beta.mapotempo.com/'),
  app: appReducer
});

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
