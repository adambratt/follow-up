import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './Login';
import People from './People';
import Person from './Person';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="people/" component={People} />
    <Route path="people/:personId" component={Person} />
  </Route>
);
