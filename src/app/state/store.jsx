import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// applyMiddleware from redux
import counter from './reducers/counter';
import authentication from './reducers/authentication';

import rootSaga from './sagas';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  counter: counter,
  authentication: authentication
}), applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;