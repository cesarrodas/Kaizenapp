import * as actions from '../actions/actions';

export const modes = {
  NORMAL: 'NORMAL',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}

const defaultState = {
  open: false,
  mode: modes.NORMAL,
  deletableId: null,
  animatingClose: false
}

const processModalReducer = (state = defaultState, action) => {
  switch(action.type) {
    case actions.OPEN_CREATE_PROCESS_MODAL:
      return Object.assign({}, state, {
        mode: modes.NORMAL,
        open: true
      });
    case actions.OPEN_UPDATE_PROCESS_MODAL:
      return Object.assign({}, state, {
        mode: modes.UPDATE,
        open: true
      });
    case actions.OPEN_DELETE_PROCESS_MODAL:
      return Object.assign({}, state, {
        mode: modes.DELETE,
        open: true
      });
    case actions.SET_PROCESS_DELETABLE:
      return Object.assign({}, state, { 
        deletableId: action.payload 
      });
    case actions.ANIMATE_PROCESS_MODAL_CLOSE:
      return Object.assign({}, state, {
        animatingClose: true
      });
    case actions.CLOSE_PROCESS_MODAL:
      return Object.assign({}, state, {
        animatingClose: false, 
        open: false 
      });
    default:
      return state
  }
}

export default processModalReducer;