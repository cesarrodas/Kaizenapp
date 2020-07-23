import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './state/store';

import {Main} from './components/Main';

//console.log(store.getState())

const RouteGuard = Component => ({match}) => {
  if(!store.getState().auth.loggedIn) {
    return <Redirect to="/" />
  } else {
    return <Component match={match} />
  }
} 

// Idk what i am doing anymore. or why I am doing what I am doing. I need to get really drink.
// I really like killing it hard. I need to figure something out. the horse. 

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
    </Provider>
  </BrowserRouter>
  , document.getElementById('app'));