import { fetchContacts, create } from './../api/remote';
import { FETCH_SUCCESS, AJAX_BEGIN, AJAX_ERROR, CREATE_SUCCESS } from './actionTypes';


function fetchSuccess(data) {
  return {
    type: FETCH_SUCCESS,
    data
  };
}

function createSuccess(contact) {
  return {
    type: CREATE_SUCCESS,
    contact
  };
}


export function createAction(payload) {
  return (dispatch) => {
    return create(payload)
    .then(json => {
      if (!json.error) {
        dispatch(createSuccess(json));
      }
    })
  }
}

export function fetchContactsAction() {
  return async (dispatch) => {
    try {
      const data = await fetchContacts();
      dispatch(fetchSuccess(data));
    } catch (err) {
      dispatch({
        type: AJAX_ERROR,
        err
      })
    }
  }
}