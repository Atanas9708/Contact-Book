import { fetchContacts, create, edit } from './../api/remote';
import { FETCH_SUCCESS, AJAX_BEGIN, AJAX_ERROR, CREATE_SUCCESS, EDIT_SUCCESS } from './actionTypes';


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

function editSuccess(contact) {
  return {
    type: EDIT_SUCCESS,
    contact
  };
}

export function editAction(contactId, payload) {
  return (dispatch) => {
    return edit(contactId, payload)
      .then(json => {
        if (!json.error) {
          dispatch(editSuccess(json));
        } else {
          dispatch({
            type: AJAX_ERROR,
            json
          });
        }
      })
  }
}


export function createAction(payload) {
  return (dispatch) => {
    return create(payload)
    .then(json => {
      if (!json.error) {
        dispatch(createSuccess(json));
      } else {
        dispatch({
          type: AJAX_ERROR,
          json
        });
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