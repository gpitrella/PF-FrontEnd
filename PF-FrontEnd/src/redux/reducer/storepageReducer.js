import {
  TEST_STOREPAGE
} from '../actions/actiontype';

const initialState = {
  test: false
};

const storepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case TEST_STOREPAGE:
      return {
        ...state,
        test: !state.test
      }
    default:
      return state;
  }
}

export default storepageReducer;