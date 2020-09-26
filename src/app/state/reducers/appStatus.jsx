import * as actions from '../actions/actions';

const defaultState = {
  showProccessModal: false,
  showProcessEditModal: false
}

const appStatusReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actions.SHOW_PROCESS_MODAL:
      return {
        showProccessModal: action.payload,
        showProcessEditModal: false
      }
    case actions.SHOW_PROCESS_EDIT_MODAL:
      return {
        showProccessModal: false,
        showProcessEditModal: action.payload
      }
    default:
      return state
  }
}

export default appStatusReducer;