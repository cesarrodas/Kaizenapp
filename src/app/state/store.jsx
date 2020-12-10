import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
// applyMiddleware from redux
import authenticationReducer from './reducers/authentication';
import registrationReducer from './reducers/registration';
import processFormReducer from './reducers/processForm';
import processesReducer from './reducers/processes';
import processModalReducer from './reducers/processModal';
import replaysReducer from './reducers/replays';
import replayPage from './reducers/replayPage';

import * as sagas from './sagas';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

const sagaMiddleware = createSagaMiddleware();

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [sagaMiddleware];
} else {
  middleware = [createLogger(), sagaMiddleware];
}

const store = createStore(combineReducers({
  auth: authenticationReducer,
  registration: registrationReducer,
  processForm: processFormReducer,
  processModal: processModalReducer,
  replays: replaysReducer,
  data: processesReducer,
  replayPage: replayPage
}), applyMiddleware(...middleware));

for(let saga in sagas){
  sagaMiddleware.run(sagas[saga]);
}

export default store;