import axios from 'axios';
import {
  TEST_HOMEPAGE, GET_BRANDS
} from './actiontype';

export const testHomePage = function() {
  return {
    type: TEST_HOMEPAGE
  }
}

export const getBrands = function() {
  return async (dispatch)=>{
    const res = await axios('http://localhost:3001/api/manufacturer');
    return dispatch({ type: GET_BRANDS, payload: res.data });
}
}