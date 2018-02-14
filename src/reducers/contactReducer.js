import { FETCH_SUCCESS, CREATE_SUCCESS } from './../actions/actionTypes';

export default function contacts(state = [], action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.data
    case CREATE_SUCCESS:
      return [...state, action.contact];
    default:
      return state;
  }
}
