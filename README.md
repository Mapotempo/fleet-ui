# fleet-ui

> Fleet React Component

[![NPM](https://img.shields.io/npm/v/fleet-ui.svg)](https://www.npmjs.com/package/fleet-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fleet-ui
```

## Redux configuration
```import { fleetReducer, fleetMiddleware } from 'fleet-ui';

export const rootReducer = combineReducers({
  fleet: fleetReducer('http://localhost:8084/'),
  app: appReducer
});

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(fleetMiddleware)
  );
}
```

## Usage

```jsx
import React, { Component } from 'react'

import { UserListComponent } from 'fleet-ui';

import configureStore from './store';


const store = configureStore();
store.dispatch(fleet_actions.signInUsers('7fbbc3b1939888534fcb7b2a519d431491a91dbc6c0c26cef554e762924558df', '0Q3gGkMDdF06l7VzUWwa6Qtt'));

class Example extends Component {
  render() {
    return (
      <Provider store={store}>
          <UserListComponent />
      </Provider>
    );
  }
}
```
## Faker
In .env project folder add following:
REACT_APP_USE_FAKER=true

## License

 © [](https://github.com/)
