import * as actions from '../actions/actions';

const defaultState = {
  processes: []
}

const processesReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actions.AUTHENTICATED:
      return {
        processes: action.payload.processes
      }
    default:
      return state
  }
}

export default processesReducer;