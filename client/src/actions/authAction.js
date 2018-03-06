import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGIN_FAIL, REGISTER_FAIL, AJAX_BEGIN, CLEAR_ERRORS } from './actionTypes';
import { register, login } from './../api/remote';


function beginAjax() {
  return {
    type: AJAX_BEGIN
  };
}

function registerSuccess() {
  return {
    type: REGISTER_SUCCESS,
  };
}

function registerFail(err) {
  return {
    type: REGISTER_FAIL,
    err
  };
}

function loginSuccess() {
  return {
    type: LOGIN_SUCCESS
  };
}

function loginFail(err) {
  return {
    type: LOGIN_FAIL,
    err
  };
}

export function redirect() {
  return {
    type: REDIRECTED
  };
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  }
}

export function registerAction(username, password, repeatPass) {
  return (dispatch) => {
    dispatch(beginAjax());
    return register(username, password, repeatPass) 
      .then(json => {
        if (json.success) {
          localStorage.setItem('authtoken', json.token);
          localStorage.setItem('userId', json.user.userId);
          localStorage.setItem('username', json.user.username);
          dispatch(registerSuccess());
        } else {
          dispatch(registerFail(json.errors || { message: json.message}));
        }
      })
  }
}

export function loginAction(username, password) {
  return (dispatch) => {
    dispatch(beginAjax());
    return login(username, password)
      .then(json => {
        if (json.success) {
          localStorage.setItem('authtoken', json.token);
          localStorage.setItem('userId', json.user.userId);
          localStorage.setItem('username', json.user.username);
          dispatch(loginSuccess());
        } else {
          dispatch(loginFail(json.errors || json.message));
        }
      })
  }
}

export function logoutAction() {
  return (dispatch) => {
    localStorage.clear();
  }
}