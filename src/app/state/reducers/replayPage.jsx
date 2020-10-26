import * as actions from '../actions/actions';

const defaultState = {
  selectedProcess: {},
  selectedReplayIndex: null,
  hypothesis: '',
  experiment: '',
  analysis: '',
  conclusion: ''
}

const replayPageReducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.UPDATE_REPLAY_PAGE:
      return Object.assign({}, state, action.payload);
    case actions.UPDATE_SELECTED_PROCESS:
      return Object.assign({}, state, {
        selectedProcess: action.payload,
        selectedReplayIndex: null
      });
    case actions.SELECTED_REPLAY_INDEX:
      return Object.assign({}, state, {
        selectedReplayIndex: action.payload
      });
    default: 
      return state
  }
}

export default replayPageReducer;