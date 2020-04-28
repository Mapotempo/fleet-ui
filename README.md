# fleet-ui

> Fleet React Component

[![NPM](https://img.shields.io/npm/v/fleet-ui.svg)](https://www.npmjs.com/package/fleet-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save fleet-ui
```

## Usage

```jsx
import { createStore,
         combineReducers,
         applyMiddleware} from 'redux';
// fleet-ui import
import { LiveView }       from 'fleet-ui';
import { fleetReducer }   from 'fleet-ui';
import * as fleetActions  from 'fleet-ui';
// CSS import
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'fleet-ui/dist/index.css';

let fleet_user = "sync_user_key";
let fleet_key  = "XXXXXXXXXXXXXXXXX";

// Create and configure store (fleetReducer need to be on "fleet" root key)
const rootReducer = combineReducers({fleet: fleetReducer(fleet_host)});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Dispatch connexion
store.dispatch(fleetActions.signInUsers([
  { syncUser: fleet_user, apiKey: fleet_key },
]));

class Example extends Component {
  render() {
    return (
    <Provider store={store}>
      <LiveView></LiveView>
    </Provider>
    );
  }
}
```

## Use faker
The fleet-ui contain api faker, to enable this feature add
```REACT_APP_USE_FAKER=true```
in .env or .env.local file.

## NPM publish
[Actual npm repository](https://www.npmjs.com/package/fleet-ui)

Before publish check and update version in package.json
```json
{
  "name": "fleet-ui",
  "version": "X.X.X",
  ...
}
```
Run the following command (maybe you will need to configure authentication before)

```shell
npm publish
```

*This task need to be automated with CI/CD on every pushed git tag*


## License

 © [](https://github.com/)
