import contacts from './contactReducer';
import { registerReducer, loginReducer } from './authReducer';

export default {
  contacts,
  register: registerReducer,
  login: loginReducer
};