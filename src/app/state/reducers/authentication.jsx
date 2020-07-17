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
        userData: action.payload,
        loading: false
      }
    case actions.NOT_AUTHENTICATED:
      return {
        loggedIn: false,
        userData: null,
        loading: false
      };
    default:
      return state
  }
}

export default authenticationReducer;