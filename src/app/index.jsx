import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './state/store';

import Main from './components/Main';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Main  />
    </Provider>
  </BrowserRouter>
  , document.getElementById('app'));