import { ActionTypes } from '@mui/base';
import {
  GET_BRANDS,
  TEST_HOMEPAGE,
  GET_PRODUCT_DETAILS
} from '../actions/actiontype';

const initialState = {
  test: false,
  brandsList: [],
  productDetails: {}
};

const homepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case TEST_HOMEPAGE:
      return {
        ...state,
        test: !state.test
      }

    case GET_BRANDS:
      return {
        ...state,
        brandsList: payload
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