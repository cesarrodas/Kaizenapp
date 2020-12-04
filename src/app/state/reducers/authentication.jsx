import * as actions from '../actions/actions';

const defaultState = {
  loggedIn: false,
  userData: null,
  loading: false,
  error: null
}

const authenticationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATING:
      return {
        loggedIn: false,
        userData: null,
        loading: true,
        error: null
      }
    case actions.AUTHENTICATED:
      return {
        loggedIn: true,
        userData: action.payload.user,
        loading: false,
        error: null
      }
    case actions.NOT_AUTHENTICATED:
      return {
        loggedIn: false,
        userData: null,
        loading: false,
        error: action.payload
      };
    case actions.REQUEST_USER_LOGOUT:
      return Object.assign({} , state, {
        loading: true
      });
    case actions.USER_LOGOUT_COMPLETE:
      return {
        loggedIn: false,
        userData: null,
        loading: false,
        error: null
      }
    case actions.USER_LOGOUT_FAILED:
      return Object.assign({} , state, {
        loading: false
      });
    default:
      return state
  }
}

export default authenticationReducer;