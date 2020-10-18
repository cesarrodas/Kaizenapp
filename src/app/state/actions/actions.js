// This is essentially what a definition of constants would look like. 

// authentication actions
export const REQUEST_AUTHENTICATE_USER = 'REQUEST_AUTHENTICATE_USER';
export const PROCESSING_AUTHENTICATE_USER = 'PROCESSING_AUTHENTICATE_USER';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATED = 'AUTHENTICATED';
export const NOT_AUTHENTICATED = 'NOT_AUTHENTICATED';

// I need similar events for signing up.
export const REQUEST_REGISTER_USER = 'REQUEST_REGISTER_USER';
export const PROCESSING_REGISTER_USER = 'PROCESSING_REGISTER_USER';
export const REGISTRATION_COMPLETE = 'REGISTRATION_COMPLETE';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const GET_USER_DATA = 'GET_USER_DATA';
export const CHECK_USER_LOGGED = 'CHECK_USER_LOGGED';

export const REQUEST_USER_LOGOUT = 'REQUEST_USER_LOGOUT';
export const USER_LOGOUT_COMPLETE = 'USER_LOGOUT_COMPLETE';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const UPDATE_PROCESS_FORM = 'UPDATE_PROCESS_FORM';

export const REQUEST_PROCESS_CREATION = 'REQUEST_PROCESS_CREATION';
export const PROCESS_CREATED = 'PROCESS_CREATED';
export const PROCESS_CREATION_FAILED = 'PROCESS_CREATION_FAILED';

export const REQUEST_PROCESS_UPDATE = 'REQUEST_PROCESS_UPDATE';
export const REQUEST_PROCESS_DELETE = 'REQUEST_PROCESS_DELETE';

export const OPEN_CREATE_PROCESS_MODAL = 'OPEN_CREATE_PROCESS_MODAL';
export const OPEN_UPDATE_PROCESS_MODAL = 'OPEN_UPDATE_PROCESS_MODAL';
export const OPEN_DELETE_PROCESS_MODAL = 'OPEN_DELETE_PROCESS_MODAL';
export const SET_PROCESS_DELETABLE = 'PROCESS_DELETABLE';
export const ANIMATE_PROCESS_MODAL_CLOSE = 'ANIMATE_PROCESS_MODAL_CLOSE';
export const CLOSE_PROCESS_MODAL = 'CLOSE_PROCESS_MODAL';

export const PROCESS_EDIT_COMPLETE = 'PROCESS_EDIT_COMPLETE';
export const PROCESS_EDIT_FAILED = 'PROCESS_EDIT_FAILED';

export const PROCESS_DELETE_COMPLETE = 'PROCESS_DELETE_COMPLETE';
export const PROCESS_DELETE_FAILED = 'PROCESS_DELETE_FAILED';

export const REQUEST_REPLAYS = 'REQUEST_REPLAYS';
export const REQUEST_REPLAYS_COMPLETE = 'REQUEST_REPLAYS_COMPLETE';
export const REQUEST_REPLAYS_FAILED = 'REQUEST_REPLAYS_FAILED';

export const UPDATE_SELECTED_PROCESS = 'UPDATE_SELECTED_PROCESS';
export const UPDATE_REPLAY_PAGE = 'UPDATE_REPLAY_PAGE';

 //example of choices for a selector.
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// action creators will be here

// PROCESS_MODAL REDUCER //

export const openCreateProcessModal = () => ({
  type: OPEN_CREATE_PROCESS_MODAL
});

export const openUpdateProcessModal = () => ({
  type: OPEN_UPDATE_PROCESS_MODAL
});

export const openDeleteProcessModal = () => ({
  type: OPEN_DELETE_PROCESS_MODAL
});

export const setProcessDeletable = (id) => ({
  type: SET_PROCESS_DELETABLE,
  payload: id
});

export const animateProcessModalClose = () => ({
  type: ANIMATE_PROCESS_MODAL_CLOSE
});

export const closeProcessModal = () => ({
  type: CLOSE_PROCESS_MODAL
});

// *************************************//

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password
});

export const requestRegisterUser = (username, password, email) => ({
  type: REQUEST_REGISTER_USER,
  username,
  password,
  email
});

export const authenticating = () => ({
  type: AUTHENTICATING
});

export const authenticated = ( userData ) => ({
  type: AUTHENTICATED,
  payload: userData
});

export const notAuthenticated = () => ({
  type: NOT_AUTHENTICATED
});

export const processRegisterUser = () => ({
  type: PROCESSING_REGISTER_USER
});

export const registered = () => ({
  type: REGISTRATION_COMPLETE
});

export const registrationFailed = () => ({
  type: REGISTRATION_FAILED
});

export const getUserData = () => ({
  type: GET_USER_DATA
});

export const checkUserLogged = () => ({
  type: CHECK_USER_LOGGED
});

export const requestUserLogout = () => ({
  type: REQUEST_USER_LOGOUT
});

export const userLogoutComplete = () => ({
  type: USER_LOGOUT_COMPLETE
});

export const userLogoutFailed = () => ({
  type: USER_LOGOUT_FAILED
});

export const updateProcessForm = ( processData ) => ({
  type: UPDATE_PROCESS_FORM,
  payload: processData
});

export const requestProcessCreation = ( processData ) => ({
  type: REQUEST_PROCESS_CREATION,
  payload: processData
});

export const processCreated = () => ({
  type: PROCESS_CREATED
});

export const processCreationFailed = () => ({
  type: PROCESS_CREATION_FAILED
});

export const requestProcessUpdate = (payload) => ({
  type: REQUEST_PROCESS_UPDATE,
  payload: payload
});

export const requestProcessDelete = (payload) => ({
  type: REQUEST_PROCESS_DELETE,
  payload: payload
});

export const processDeleteComplete = () => ({
  type: PROCESS_DELETE_COMPLETE
});

export const processDeleteFailed = () => ({
  type: PROCESS_DELETE_FAILED
});

export const processEditComplete = () => ({
  type: PROCESS_EDIT_COMPLETE
});

export const processEditFailed = () => ({
  type: PROCESS_EDIT_FAILED
});

export const requestReplays = (id) => ({
  type: REQUEST_REPLAYS,
  payload: id
});

export const requestReplaysComplete = (replays) => ({
  type: REQUEST_REPLAYS_COMPLETE,
  payload: replays
});

export const requestReplaysFailed = () => ({
  type: REQUEST_REPLAYS_FAILED
});

export const updateSelectedProcess = (payload) => ({
  type: UPDATE_SELECTED_PROCESS,
  payload: payload
});

export const updateReplayPage = (payload) => ({
  type: UPDATE_REPLAY_PAGE,
  payload: payload
});
