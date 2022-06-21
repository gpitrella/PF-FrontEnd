import { combineReducers } from 'redux';
import homepage from './homepageReducer';
import storepage from './storepageReducer';

export default combineReducers({
  homepage,
  storepage,
})