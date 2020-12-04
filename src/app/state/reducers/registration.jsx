import * as actions from '../actions/actions';

const defaultState = {
  loading: false,
  error: null,
  registered: false
}

const registrationReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actions.PROCESSING_REGISTER_USER:
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    case actions.REGISTRATION_COMPLETE:
      return Object.assign({}, state, {
        registered: true,
        loading: false,
        error: null
      });
    case actions.REGISTRATION_FAILED:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
    default:
      return state
  }
}

export default registrationReducer;