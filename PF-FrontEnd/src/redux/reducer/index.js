import { combineReducers } from 'redux';
import general from './generalReducer';
import homepage from './homepageReducer';
import storepage from './storepageReducer';
import userReducer from './userReducer';

import darkModeReducer from '../../context/darkModeReducer';
import modalAddAddress from './modalAddAddressReducer'; 

export default combineReducers({
  general,
  homepage,
  storepage,
  darkModeReducer,
  userReducer,
  modalAddAddress,
})