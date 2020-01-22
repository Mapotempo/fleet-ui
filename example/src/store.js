import { createStore, combineReducers } from 'redux';
import { fleetReducer } from 'fleet-ui';
import appReducer from './reducer/appReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

export const rootReducer = combineReducers({
    fleet: fleetReducer(),
    app: appReducer
});


export default function configureStore() {
    return createStore(
        rootReducer,
        composeWithDevTools()
    );
}
