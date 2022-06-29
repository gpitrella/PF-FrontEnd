import {
  CHANGE_THEME,
  ADD_TO_CART,
  POST_COMMENT_PRODUCT
} from '../actions/actiontype';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
<<<<<<< HEAD
  theme: 'lightTheme',
  productsCart: [],
=======
  theme: 'darkTheme',
>>>>>>> 03d2dd141d6d3cca82656ade0d0d77b02f7f037d
  commentCreated: {}
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: THEME[payload]
      }
    
    case ADD_TO_CART:
      return {
        ...state,
        productsCart: state.productsCart.concat(payload)
      }

    case POST_COMMENT_PRODUCT:
      return {
        ...state,
        commentCreated: payload
      }
      
    default:
      return state;
  }
}

export default generalReducer;