import { createStore, combineReducers } from 'redux';
// applyMiddleware from redux
import counter from './reducers/counter';
import authentication from './reducers/authentication';

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const store = createStore(combineReducers({
  counter: counter,
  authentication: authentication
}));

export default store;