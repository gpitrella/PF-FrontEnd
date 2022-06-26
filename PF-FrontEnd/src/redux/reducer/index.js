import { combineReducers } from 'redux';
import general from './generalReducer';
import homepage from './homepageReducer';
import storepage from './storepageReducer';
import modalAddAddress from './modalAddAddressReducer'; 

export default combineReducers({
  general,
  homepage,
  storepage,
  modalAddAddress,
})