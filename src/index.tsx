import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux-immutable';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import RoutingReducer from './reducers/router';
import CounterListReducer from './reducers/counterList';

import App from './modules/app';

import registerServiceWorker from './registerServiceWorker';

import './index.css';

const RootReducer = combineReducers(
  { counterList: CounterListReducer,
  routing: RoutingReducer}
);

// https://github.com/ReactTraining/react-router/issues/4801
export const history = createHistory({basename: process.env.PUBLIC_URL});
const store = createStore(
  RootReducer,
  applyMiddleware(logger, routerMiddleware(history))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
