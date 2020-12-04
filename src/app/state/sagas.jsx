import { put, take } from 'redux-saga/effects';

// function HomeButton() {
//   let history = useHistory();

import * as actions from './actions/actions';
import axios from 'axios';

const url = "https://localhost:3000";

export function* userRegistrationSaga(){
  while(true){
    const { username, email, password } = yield take(actions.REQUEST_REGISTER_USER);

    yield put(actions.processingRegisterUser());

    try {
      const { data } = yield axios.post(url + '/api/users/create', { username, password, email });
      if(data.ok){
        yield put(actions.registrationComplete());
        yield put(actions.requestAuthenticateUser(username, password));
      }
    } catch (err) {
      yield put(actions.registrationFailed(err.response.data));
    }
  }
}

export function* userAuthenticationSaga(){
  while(true){
    const { username, password } = yield take(actions.REQUEST_AUTHENTICATE_USER);
    yield put(actions.authenticating());
    try {
      const { data } = yield axios.post(url + '/api/authenticate', {username, password}, { withCredentials: true });

      if(data.ok){
        yield put(actions.authenticated(data.user));
        yield put(actions.getUserData());
      }
    } catch (err) {
      yield put(actions.notAuthenticated(err.response.data));
    }
  }
}

export function* getUserData(){
  while ( true ) {
    yield take(actions.GET_USER_DATA);
    try {
      const { data } = yield axios.get(url + '/api/getUserData', { withCredentials: true });
      if(data.ok){
        yield put(actions.authenticated(data.result));
      }
    } catch (err) {
      yield put(actions.notAuthenticated(err.response.data));
    }

  }
}

export function* logOut(){
  while ( true ) {
    yield take(actions.REQUEST_USER_LOGOUT);

    try {
      const { data } = yield axios.get(url + '/api/logout', { withCredentials: true });
  
      if(data.ok){
        yield put(actions.userLogoutComplete());
      }
    } catch (err){
      yield put(actions.userLogoutFailed());
    }
  }
}

export function* createProcess(){
  while(true){
    const processData = yield take(actions.REQUEST_PROCESS_CREATION);

    try {
      const { data } = yield axios.post(url + '/api/processes/create', processData.payload, { withCredentials: true });
      if(data.ok){
        yield put(actions.requestReplayCreate({
          analysis: "",
          conclusion: "",
          experiment: "",
          hypothesis: "",
          creator: data.result.creator,
          process: data.result._id
        }));
        yield put(actions.processCreated());
        yield put(actions.getUserData());
        yield put(actions.closeProcessModal(true));
      }
    } catch (err) {
      yield put(actions.processCreationFailed());
      yield put(actions.closeProcessModal(true));
    }
  }
}

export function* updateProcess(){
  while(true){
    const processData = yield take(actions.REQUEST_PROCESS_UPDATE);
    const updateData = {};
    updateData.process = processData.payload.process;
    updateData.category = processData.payload.category;
    updateData.tags = processData.payload.tags;

    try {
      const { data } = yield axios.put(url + `/api/processes/${processData.payload._id}`, updateData, { withCredentials: true })
      if(data.ok){
        yield put(actions.closeProcessModal(true));
        yield put(actions.getUserData());
        yield put(actions.processEditComplete());
      }
    } catch (error) {
      yield put(actions.processEditFailed());
      yield put(actions.closeProcessModal(true));
    }
  }
}

export function* deleteProcess(){
  while(true){
    const request = yield take(actions.REQUEST_PROCESS_DELETE);

    const deleteUrl = url + `/api/processes/${request.payload}`;
    try {
      const { data } = yield axios.delete(deleteUrl, { withCredentials: true });

      if(data.ok){
        yield put(actions.processDeleteComplete());
        yield put(actions.getUserData());
        yield put(actions.closeProcessModal(true));
      }

    } catch (error) {
      yield put(actions.processDeleteFailed());
      yield put(actions.closeProcessModal(true));
    }
  }
}

export function* createReplay(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAY_CREATE);

    const createUrl = url + `/api/replay/create`;

    try {
      const { data } = yield axios.post(createUrl, request.payload, { withCredentials: true });
      if(data.ok){
        yield put(actions.replayCreateComplete());
        yield put(actions.requestReplays(request.payload.process));
        yield put(actions.selectedReplayIndex(0));
        yield put(actions.resetReplayPage());
      }
    } catch (error) {
      yield put(actions.replayCreateFailed());
    }
  }
}

export function* updateReplay(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAY_UPDATE);
    const replayId = request.payload._id;

    const updateUrl = url + `/api/replay/${replayId}`;

    try {
      const { data } = yield axios.put(updateUrl, request.payload, { withCredentials: true });
      if(data.ok) {
        yield put(actions.replayUpdateComplete());
      }
    } catch (error) {
      yield put(actions.replayUpdateFailed());
    }
  }
}

export function* deleteReplay(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAY_DELETE);
    const replayId = request.payload._id;

    console.log("replay id: ", replayId);

    const deleteUrl = url + `/api/replay/${replayId}`;

    try {
      const { data } = yield axios.delete(deleteUrl, { withCredentials: true });
      if(data.ok){
        yield put(actions.replayDeleteComplete());
        yield put(actions.selectedReplayIndex(0));
        yield put(actions.requestReplays(request.payload.process));
      } 
    } catch ( error ) {
      yield put(actions.replayDeleteFailed());
    }
  }
}

export function* getReplays(){
  while(true){
    const request = yield take(actions.REQUEST_REPLAYS);

    try {
      const { data } = yield axios.get( url + `/api/replays/process/${request.payload}`, { withCredentials: true });
      if(data.ok){
        yield put(actions.requestReplaysComplete(data.result));
        if(data.result.length > 0){
          yield put(actions.selectedReplayIndex(0));
        }
      }
    } catch ( error ) {
      yield put(actions.requestReplaysFailed());
    }
  }
}

