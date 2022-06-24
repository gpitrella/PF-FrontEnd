import { ActionTypes } from '@mui/base';
import {
  GET_BRANDS,
  TEST_HOMEPAGE,
  ALL_CATEGORIES,
  CREATE_CATEGORY,
  GET_PRODUCT_DETAILS
} from '../actions/actiontype';

const initialState = {
  test: false,
  allCategories: [],
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

    case ALL_CATEGORIES:
      return {
        ...state,
        allCategories: payload
      }
    
    case CREATE_CATEGORY:
      return {
        ...state
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