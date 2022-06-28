import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT
} from '../actions/actiontype';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
  theme: 'darkTheme',
  commentCreated: {}
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: THEME[payload]
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