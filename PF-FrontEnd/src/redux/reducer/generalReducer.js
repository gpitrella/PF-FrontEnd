import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT,
  SIGN_UP,
  LOG_IN
} from '../actions/actiontype';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
  theme: 'lightTheme',
  commentCreated: {},
  user: {}
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
    case SIGN_UP:
      return {
        ...state,
        user: payload
      }
    case LOG_IN:
      return {
        ...state,
        user: payload
    }
    default:
      return state;
  }
}

export default generalReducer;