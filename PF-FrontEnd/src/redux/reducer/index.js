import { combineReducers } from 'redux';
import general from './generalReducer';
import homepage from './homepageReducer';
import storepage from './storepageReducer';

export default combineReducers({
  general,
  homepage,
  storepage,
})