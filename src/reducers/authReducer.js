import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGIN_FAIL, REGISTER_FAIL } from './../actions/actionTypes';

export function registerReducer(state = { success: false, errors: '' }, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return Object.assign({}, state, { success: true });
    case REDIRECTED:
      return Object.assign({}, state, { success: false });
    case REGISTER_FAIL:
      return Object.assign({}, state, { errors: action.err });
    default:
      return state;
  }
}

export function loginReducer(state = { success: false, errors: '' }, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { success: true });
    case REDIRECTED:
      return Object.assign({}, state, { success: false });
    case LOGIN_FAIL:
      return Object.assign({}, state, { errors: action.err });
    default:
      return state;
  }
}