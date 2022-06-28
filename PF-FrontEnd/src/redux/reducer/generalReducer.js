import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT
} from '../actions/actiontype';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
  theme: 'lightTheme',
  commentCreated: {}
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
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