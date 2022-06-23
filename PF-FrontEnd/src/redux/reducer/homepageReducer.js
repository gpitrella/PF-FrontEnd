import { ActionTypes } from '@mui/base';
import {
<<<<<<< HEAD
  GET_BRANDS,
  TEST_HOMEPAGE
=======
  TEST_HOMEPAGE,
  GET_PRODUCT_DETAILS
>>>>>>> 69d17867e19ff883bd42ddc88b17237221e177be
} from '../actions/actiontype';

const initialState = {
  test: false,
<<<<<<< HEAD
  brandsList: []
=======
  productDetails: {}
>>>>>>> 69d17867e19ff883bd42ddc88b17237221e177be
};

const homepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case TEST_HOMEPAGE:
      return {
        ...state,
        test: !state.test
      }
<<<<<<< HEAD

    case GET_BRANDS:
      return {
        ...state,
        brandsList: payload
      }

=======
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: payload          
        }
>>>>>>> 69d17867e19ff883bd42ddc88b17237221e177be
    default:
      return state;
  }
}

export default homepageReducer;