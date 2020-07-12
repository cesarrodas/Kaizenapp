import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './state/store';

//import {Dashboard} from './components/Dashboard';
import {Main} from './components/Main';
//console.log(store.getState())

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main />
    </Provider>
  </BrowserRouter>
  , document.getElementById('app'));