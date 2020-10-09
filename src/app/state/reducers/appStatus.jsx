import * as actions from '../actions/actions';

const defaultState = {
  showProccessModal: false,
  showProcessEditModal: false,
  showProcessDeleteModal: false,
  processDeletable: null
}

const appStatusReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actions.SHOW_PROCESS_MODAL:
      return Object.assign({}, state, {
        showProccessModal: action.payload,
        showProcessEditModal: false,
        showProcessDeleteModal: false
      });
    case actions.SHOW_PROCESS_EDIT_MODAL:
      return Object.assign({}, state, {
        showProccessModal: false,
        showProcessEditModal: action.payload,
        showProcessDeleteModal: false
      });
    case actions.SHOW_PROCESS_DELETE_MODAL:
      return Object.assign({}, state, {
        showProccessModal: false,
        showProcessEditModal: false,
        showProcessDeleteModal: action.payload
      });
    case actions.UPDATE_PROCESS_DELETABLE:
      return Object.assign({}, state, { processDeletable: action.payload });
    default:
      return state
  }
}

export default appStatusReducer;