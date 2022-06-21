import {
  TEST_HOMEPAGE
} from '../actions/actiontype';

const initialState = {
  test: false
};

const homepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case TEST_HOMEPAGE:
      return {
        ...state,
        test: !state.test
      }
    default:
      return state;
  }
}

export default homepageReducer;