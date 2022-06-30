import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT,
  SHOW_MINI_MODAL,
} from '../actions/actiontype';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
  theme: 'lightTheme',
  commentCreated: {},
  miniModal: {
    show: false,
    msg: '',
    success: false,
    error: false,
  },
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
    case SHOW_MINI_MODAL:
      return {
        ...state,
        miniModal: {
          show: payload.show,
          msg: payload.msg ? payload.msg : '',
          success: payload.success ? payload.success : false,
          error: payload.error ? payload.error : false,
        }
      }
    default:
      return state;
  }
}

export default generalReducer;