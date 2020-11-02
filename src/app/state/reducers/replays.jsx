import * as actions from '../actions/actions';

const defaultState = {
  loading: false,
  replays: []
}

const replaysReducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.REQUEST_REPLAYS:
      return Object.assign({}, state, {
        loading: true
      });
    case actions.REQUEST_REPLAYS_COMPLETE:
      return Object.assign({}, state, {
        loading: false,
        replays: action.payload
      });
    case actions.REQUEST_REPLAYS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        replays: []
      });
    default: 
      return state
  }
}

export default replaysReducer;