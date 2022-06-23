import { ActionTypes } from '@mui/base';
import {
  TEST_HOMEPAGE,
  GET_PRODUCT_DETAILS
} from '../actions/actiontype';

const initialState = {
  test: false,
  productDetails: {}
};

const homepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case TEST_HOMEPAGE:
      return {
        ...state,
        test: !state.test
      }
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: payload          
        }
    default:
      return state;
  }
}

export default homepageReducer;