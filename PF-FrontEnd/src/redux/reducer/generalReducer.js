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
  theme: 'lightTheme',
  productsCart: [],
  commentCreated: {}
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
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