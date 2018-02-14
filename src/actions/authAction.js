import { REGISTER_SUCCESS, LOGIN_SUCCESS, REDIRECTED, LOGIN_FAIL, REGISTER_FAIL } from './actionTypes';
import { register, login } from './../api/remote';

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

export function registerAction(username, password) {
  return (dispatch) => {
    return register(username, password)
      .then(json => {
        if (!json.error) {
          localStorage.setItem('authtoken', json._kmd.authtoken);
          localStorage.setItem('username', json.username);
          dispatch(registerSuccess());
        } else {
          dispatch(registerFail(json.description));
        }
      })
  }
}

export function loginAction(username, password) {
  return (dispatch) => {
    return login(username, password)
      .then(json => {
        if (!json.error) {
          localStorage.setItem('authtoken', json._kmd.authtoken);
          localStorage.setItem('username', json.username);
          dispatch(loginSuccess());
        } else {
          dispatch(loginFail(json.description));
        }
      })
  }
}

export function logoutAction() {
  return (dispatch) => {
    localStorage.clear();
  }
}