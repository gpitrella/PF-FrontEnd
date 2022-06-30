import axios from 'axios';
import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT,
  SHOW_MINI_MODAL
} from './actiontype';

// Change color Theme - Night / Day:
export const changeTheme = function(theme = 'LIGHT') {
  return {
    type: CHANGE_THEME,
    payload: theme
  }
}

// Create comments product
export const postCommentProduct = function(comment, id) {
  return function(dispatch){
    return axios.post(`http://localhost:3001/api/comments`, {comment, id})
                .then(comment => dispatch({ type: POST_COMMENT_PRODUCT, payload: comment.data}))
                .catch(error => console.log(error))
}
}

export const showMiniModal = function(show = true, msg = '', success = false, error = false) {
  console.log(show, msg, success, error);
  return {
    type: SHOW_MINI_MODAL,
    payload: {
      show: show,
      msg: msg,
      success: success,
      error: error
    }
  }
}