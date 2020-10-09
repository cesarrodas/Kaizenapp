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
      yield put(actions.getUserData());
    }
  }
}

// this needs to be renamed in order to update all data
export function* getUserData(){
  while ( true ) {
    yield take(actions.GET_USER_DATA);
    const { data } = yield axios.get(url + '/api/getUserData', { withCredentials: true });

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
      yield put(actions.getUserData());
    } else {
      yield put(actions.processCreationFailed());
    }
  }
}

export function* updateProcess(){
  while(true){
    const processData = yield take(actions.REQUEST_PROCESS_UPDATE);
    console.log("processData", processData);
    const updateData = {};
    updateData.process = processData.payload.process;
    updateData.category = processData.payload.category;
    updateData.tags = processData.payload.tags;
    console.log("update data", updateData);
    console.log("update id ", processData.payload.id);

    const { data } = yield axios.put(url + `/api/processes/${processData.payload.id}`, updateData, { withCredentials: true })

    if(data.ok){
      console.log("great update to data");
    } else {
      console.log("update failed");
    }
    // what can I do to pass the correct data to the form. 
    //const { data } 
  }
}

export function* deleteProcess(){
  while(true){
    const request = yield take(actions.REQUEST_PROCESS_DELETE);

    //console.log("data at delete: ", processId);
    const deleteUrl = url + `/api/processes/${request.payload}`;
    console.log("DELETE URL: ", deleteUrl);

    const { data } = yield axios.delete(deleteUrl, { withCredentials: true });

    if(data.ok){
      yield put(actions.processDeleteComplete());
      yield put(actions.getUserData());
    } else {
      yield put(actions.processDeleteFailed());
    }
  }
}

