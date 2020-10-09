import * as actions from '../actions/actions';

const defaultState = {
  process: '',
  category: 'lifestyle',
  tags: [],
  creator: '',
  id: null
}

const processFormReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.UPDATE_PROCESS_FORM:
      return {
        process: action.payload.process,
        category: action.payload.category,
        tags: action.payload.tags,
        creator: action.payload.creator,
        id: action.payload._id ? action.payload._id : state.id
      }

      //return Object.assign({}, state, action.payload);
    default:
      return state
  }
}

export default processFormReducer;