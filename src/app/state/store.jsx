import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
// applyMiddleware from redux
import counter from './reducers/counter';
import something from './reducers/something';

import * as sagas from './sagas';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  counter: counter,
  something: something
}), applyMiddleware(createLogger() ,sagaMiddleware));

for(let saga in sagas){
  sagaMiddleware.run(sagas[saga]);
}

export default store;