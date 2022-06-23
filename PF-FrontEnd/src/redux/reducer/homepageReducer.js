import {
  GET_BRANDS,
  TEST_HOMEPAGE
} from '../actions/actiontype';

const initialState = {
  test: false,
  brandsList: []
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

    default:
      return state;
  }
}

export default homepageReducer;