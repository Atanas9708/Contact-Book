import { FETCH_SUCCESS, CREATE_SUCCESS, EDIT_SUCCESS, DELETE_SUCCESS } from './../actions/actionTypes';

export default function contacts(state = [], action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return action.data
    case CREATE_SUCCESS:
      return [...state, action.contact];
    case EDIT_SUCCESS:
      let contact = state.filter(c => c._id === action.contact._id)[0];
      let index = state.indexOf(contact);
      return [...state.slice(0, index),
      Object.assign({}, state[index], action.contact),
      ...state.slice(index + 1)
      ];
    case DELETE_SUCCESS:
      return state.filter(c => c._id !== action.id);
    default:
      return state;
  }
}
