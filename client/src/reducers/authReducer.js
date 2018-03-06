import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGIN_FAIL, REGISTER_FAIL, AJAX_BEGIN, CLEAR_ERRORS } from './../actions/actionTypes';

export function registerReducer(state = { success: false, errors: false, loading: false }, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { success: true, loading: false });
    case REDIRECTED:
      return Object.assign({}, state, { success: false, loading: false });
    case REGISTER_FAIL:
      return Object.assign({}, state, { errors: action.err, loading: false });
    case AJAX_BEGIN:
      return Object.assign({}, state, { loading: true });
    case CLEAR_ERRORS:
      return Object.assign({}, state, { errors: false, loading: false });
    default:
      return state;
  }
}

export function loginReducer(state = { success: false, errors: false, loading: false }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { success: true, loading: false });
    case REDIRECTED:
      return Object.assign({}, state, { success: false, loading: false });
    case LOGIN_FAIL:
      return Object.assign({}, state, { errors: action.err, loading: false });
    case AJAX_BEGIN:
      return Object.assign({}, state, { loading: true });
    case CLEAR_ERRORS:
      return Object.assign({}, state, { errors: false, loading: false });
    default:
      return state;
  }
}