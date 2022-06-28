import { combineReducers } from 'redux';
import general from './generalReducer';
import homepage from './homepageReducer';
import storepage from './storepageReducer';
import darkModeReducer from '../../context/darkModeReducer';

export default combineReducers({
  general,
  homepage,
  storepage,
  darkModeReducer,
})