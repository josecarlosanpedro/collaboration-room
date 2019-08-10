import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import 'rxjs';
import App from './root/App';
import rootReducer from './stores/reducers';
import rootEpic from './stores/actions';
import 'antd/dist/antd.css';

import serviceWorker from './serviceWorker';

const composeEnhancers =
  (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const epicMiddleware = createEpicMiddleware();
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);
epicMiddleware.run(rootEpic);
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
serviceWorker();
