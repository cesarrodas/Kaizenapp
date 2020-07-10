import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './state/store';

//import {Dashboard} from './components/Dashboard';
import {Main} from './components/Main';
//console.log(store.getState())

ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('app'));