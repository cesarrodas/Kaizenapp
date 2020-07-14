import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Login from './Login';
import Register from './Register';

export const Main = () => (
  <main>
    <Switch>
      <Route path="/" component={Navigation} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </main>
);



