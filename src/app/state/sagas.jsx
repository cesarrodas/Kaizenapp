import { put, take } from 'redux-saga/effects';

import * as actions from './actions/actions';
import axios from 'axios';

const url = "http://localhost:3000";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

// export function* incrementAsync() {
//   yield delay(1000)
//   yield put({ type: 'INCREMENT' })
// }

// // Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
// export function* watchIncrementAsync() {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }

export function* userRegistrationSaga(){
  while(true){
    const { username, email, password } = yield take(actions.REQUEST_REGISTER_USER);

    try {
      const { data } = yield axios.post(url + '/api/users/create', { username, password, email });
      if(!data){
        throw new Error();
      }

      console.log("user Created! ", data);
    } catch (e) {
      console.log("Could not register: ", e);
    }
  }
}

export function* userAuthenticationSaga(){
  while(true){
    const { username, password } = yield take(actions.REQUEST_AUTHENTICATE_USER);
  
    try {
      const { data } = yield axios.post(url + '/api/authenticate', {username, password})
      if(!data){
        console.log("Error maybe???");
        throw new Error();
      }
      
      put(actions.authenticated(data));
      console.log("Authenticated!", data);
  
      //yield put(mutations.setState(data.state));
      //yield put(mutations.processAuthenticateUser(mutations.AUTHENTICATED));
  
      //history.push('/dashboard');
    } catch (e) {
      console.log("Can't authenticate: ", e);
      //yield put(actions.processAuthenticateUser(actions.NOT_AUTHENTICATED));
    }
  }
}

// export default function* rootSaga() {
//   yield all([
//     watchIncrementAsync(),
//     userAuthenticationSaga()
//   ])
// }