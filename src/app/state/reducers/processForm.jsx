import * as actions from '../actions/actions';

const defaultState = {
  process: '',
  category: 'lifestyle',
  tags: [],
  creator: '',
  _id: null
}

const processFormReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_PROCESS_FORM:
      return Object.assign({}, state, action.payload);
    default:
      return state
  }
}

export default processFormReducer;