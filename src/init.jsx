import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import * as stylus from './assets/styles/layout.styl';
import './assets/styles/font-awesome.css';


// Initializes all routes
import routes from './routes';

// Initialize redux store
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
