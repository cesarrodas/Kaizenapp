import * as actions from '../actions/actions';

const defaultState = {
  process: '',
  category: 'lifestyle',
  tags: [],
  creator: ''
}

const processFormReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_PROCESS_FORM:
      return {
        process: action.payload.process,
        category: action.payload.category,
        tags: action.payload.tags,
        creator: action.payload.creator
      }
    default:
      return state
  }
}

export default processFormReducer;