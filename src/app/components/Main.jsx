import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Login from './Login';

export const Main = () => (
  // <div>
  //   <Navigation />
  //   <h1>Kaizen</h1>
  //   <div>Improve your routine.</div>
  // </div>
  <main>
    <Switch>
      <Route path="/" component={Navigation} exact />
      <Route path="/login" component={Login} />
    </Switch>
  </main>
);



