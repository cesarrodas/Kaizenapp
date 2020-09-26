import { put, take } from 'redux-saga/effects';

// function HomeButton() {
//   let history = useHistory();

import * as actions from './actions/actions';
import axios from 'axios';

const url = "https://localhost:3000";

export function* userRegistrationSaga(){
  while(true){
    const { username, email, password } = yield take(actions.REQUEST_REGISTER_USER);

    yield put(actions.processRegisterUser());
    const { data } = yield axios.post(url + '/api/users/create', { username, password, email });
    
    if(!data.ok){
      yield put(actions.registrationFailed());
    } else {
      yield put(actions.registered());
      yield put(actions.requestAuthenticateUser(username, password));
    }
    //{ error: e }
  }
}

export function* userAuthenticationSaga(){
  while(true){
    const { username, password } = yield take(actions.REQUEST_AUTHENTICATE_USER);
    yield put(actions.authenticating());
    
    const { data } = yield axios.post(url + '/api/authenticate', {username, password}, { withCredentials: true })
    
    console.log("login data: ", data);

    if(!data.ok){
      yield put(actions.notAuthenticated());
    } else {
      yield put(actions.authenticated(data.user));
    }
  }
}

export function* isUserLoggedIn(){
  while ( true ) {
    yield take(actions.CHECK_USER_LOGGED);
    const { data } = yield axios.get(url + '/api/isLogged', { withCredentials: true });

    console.log("DATA from is logged: ", data);
    if(data.ok){
      yield put(actions.authenticated(data.result));
    }

  }
}

export function* logOut(){
  while ( true ) {
    yield take(actions.REQUEST_USER_LOGOUT);
    const { data } = yield axios.get(url + '/api/logout', { withCredentials: true });

    if(data.ok){
      yield put(actions.userLogoutComplete());
    } else {
      yield put(actions.userLogoutFailed());
    }
  }

}

export function* createProcess(){
  while(true){
    const processData = yield take(actions.REQUEST_PROCESS_CREATION);
    //console.log("process SUBMITTED: ", processData);

    const { data } = yield axios.post(url + '/api/processes/create', processData.payload, { withCredentials: true });
    
    if(data.ok){
      yield put(actions.processCreated());
    } else {
      yield put(actions.processCreationFailed());
    }
  }
}
