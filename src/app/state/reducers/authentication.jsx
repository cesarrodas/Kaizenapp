import * as actions from '../actions/actions';

const defaultState = {
  loggedIn: false,
  userData: null,
  loading: false
}

const authenticationReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.AUTHENTICATING:
      return {
        loggedIn: false,
        userData: null,
        loading: true
      }
    case actions.AUTHENTICATED:
      return {
        loggedIn: true,
        userData: action.payload.user,
        loading: false
      }
    case actions.NOT_AUTHENTICATED:
      return {
        loggedIn: false,
        userData: null,
        loading: false
      };
    case actions.REQUEST_USER_LOGOUT:
      return Object.assign({} , state, {
        loading: true
      });
    case actions.USER_LOGOUT_COMPLETE:
      return {
        loggedIn: false,
        userData: null,
        loading: false
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