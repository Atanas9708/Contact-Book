import { FETCH_SUCCESS, CREATE_SUCCESS, EDIT_SUCCESS, DELETE_SUCCESS } from './../actions/actionTypes';

export default function contacts(state = { contacts: [], pages: {}, success: false }, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.data.contacts,
        pages: action.data.pages,
        success: action.data.success
      })
    case CREATE_SUCCESS:
      return Object.assign({}, state, { contacts: [...state.contacts, action.contact] });
    // return [...state, action.contact];
    case EDIT_SUCCESS:
      let contact = state.contacts.filter(c => c._id === action.contact._id)[0];
      let index = state.contacts.indexOf(contact);
      return Object.assign({}, state, {
        contacts: [...state.contacts.slice(0, index),
        Object.assign({}, state.contacts[index], action.contact),
        ...state.contacts.slice(index + 1)
        ]
      })
    case DELETE_SUCCESS:
      return Object.assign({}, state, {
        contacts: state.contacts.filter(c => c._id !== action.id)
      })
    default:
      return state;
  }
}
