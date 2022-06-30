import { combineReducers } from 'redux';
import general from './generalReducer';
import homepage from './homepageReducer';
import storepage from './storepageReducer';
import darkModeReducer from '../../context/darkModeReducer';
import dashboard from './dashboardReducer';

export default combineReducers({
  general,
  homepage,
  storepage,
  darkModeReducer,
  dashboard,
})