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

    console.log("DATA PASSED TO CREATION", processData.payload);

    const { data } = yield axios.post(url + '/api/processes/create', processData.payload, { withCredentials: true });
    
    if(data.ok){
      yield put(actions.processCreated());
      yield put(actions.getUserData());
      yield put(actions.closeProcessModal(true));
    } else {
      yield put(actions.processCreationFailed());
      yield put(actions.closeProcessModal(true));
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

    const { data } = yield axios.put(url + `/api/processes/${processData.payload._id}`, updateData, { withCredentials: true })

    if(data.ok){
      yield put(actions.closeProcessModal(true));
      yield put(actions.getUserData());
      console.log("great update to data");
      yield put(actions.processEditComplete());
    } else {
      yield put(actions.processEditFailed());
      yield put(actions.closeProcessModal(true));
    }
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
      yield put(actions.closeProcessModal(true));
    } else {
      yield put(actions.processDeleteFailed());
      yield put(actions.closeProcessModal(true));
    }
  }
}

export function* createReplay(){
  while(true){
    // the request object is where we get the data
    const request = yield take(actions.REQUEST_REPLAY_CREATE);

    const createUrl = url + `/api/replay/create`;

    const { data } = yield axios.post(createUrl, request.payload, { withCredentials: true });

    if(data.ok){
      yield put(actions.replayCreateComplete());
    } else {
      yield put(actions.replayCreateFailed());
    }
  }
}

export function* updateReplay(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAY_UPDATE);
    const replayId = request.payload._id;
    
    console.log("REPLAY ID: ", replayId);
    console.log("REQUEST DATA: ", request);

    const updateUrl = url + `/api/replay/${replayId}`;

    const { data } = yield axios.put(updateUrl, request.payload, { withCredentials: true });

    console.log("UPDATE DATE RESULT: ", data);
  
    if(data.ok){
      yield put(actions.replayUpdateComplete());
    } else {
      yield put(actions.replayUpdateFailed());
    }
  }
}

export function* deleteReplay(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAY_DELETE);
    const replayId = request.payload._id;

    const deleteUrl = url + `/api/replay/${replayId}`;

    const { data } = yield axios.put(deleteUrl, request, { withCredentials: true });
  
    if(data.ok){
      yield put(actions.replayDeleteComplete());
    } else {
      yield put(actions.replayDeleteFailed());
    }
  }
}

export function* getReplays(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAYS);

    console.log("requesting replays: ", request);
    
    const { data } = yield axios.get( url + `/api/replays/process/${request.payload}`, { widthCredentials: true });

    if(data.ok){
      yield put(actions.requestReplaysComplete(data.result));
      if(data.result.length > 0){
        yield put(actions.selectedReplayIndex(0));
      }
    } else {
      yield put(actions.requestReplaysFailed());
    }
  }
}

