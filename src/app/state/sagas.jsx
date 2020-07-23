import { put, take } from 'redux-saga/effects';

import * as actions from './actions/actions';
import axios from 'axios';

const url = "http://localhost:3000";

//const delay = (ms) => new Promise(res => setTimeout(res, ms));

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

    yield put(actions.processRegisterUser());
    try {
      const { data } = yield axios.post(url + '/api/users/create', { username, password, email });

      if(!data){
        yield put(actions.registrationFailed());
        throw new Error("Data not retrieved");
      }

      //console.log("user Created! ", data);
      yield put(actions.registered());
    } catch (e) {
      yield put(actions.registrationFailed({ error: e }));
    }
  }
}

export function* userAuthenticationSaga(){
  while(true){
    const { username, password } = yield take(actions.REQUEST_AUTHENTICATE_USER);
    yield put(actions.authenticating());
    try {
      const { data } = yield axios.post(url + '/api/authenticate', {username, password}, { withCredentials: true })
      if(!data){
        throw new Error("User not found.");
      }
      
      yield put(actions.authenticated(data.user));
      console.log("Authenticated!", data);

    } catch (e) {
      yield put(actions.notAuthenticated());
    }
  }
}

// export default function* rootSaga() {
//   yield all([
//     watchIncrementAsync(),
//     userAuthenticationSaga()
//   ])
// }