import * as actions from '../actions/actions';

const defaultState = {
  selectedProcess: '',
  hypothesis: '',
  experiment: '',
  analysis: '',
  conclusion: ''
}

const replayPageReducer = (state = defaultState, action) => {
  switch(action.type){
    case actions.UPDATE_REPLAY_PAGE:
      return Object.assign({}, state, {
        hypothesis: action.payload.hypothesis,
        experiment: action.payload.experiment,
        analysis: action.payload.analysis,
        conclusion: action.payload.conclusion
      });
    case actions.UPDATE_SELECTED_PROCESS:
      return Object.assign({}, state, {
        selectedProcess: action.payload
      });
    default: 
      return state
  }
}

export default replayPageReducer;