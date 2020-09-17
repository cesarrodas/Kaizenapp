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

export const CHECK_USER_LOGGED = 'CHECK_USER_LOGGED';

export const REQUEST_USER_LOGOUT = 'REQUEST_USER_LOGOUT';
export const USER_LOGOUT_COMPLETE = 'USER_LOGOUT_COMPLETE';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';
/*
 * other constants
 */

 //example of choices for a selector.
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

// action creators will be here

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
