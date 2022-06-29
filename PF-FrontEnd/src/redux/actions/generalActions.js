import axios from 'axios';
import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT
} from './actiontype';

// Change color Theme - Night / Day:
export const changeTheme = function() {
  return {
    type: CHANGE_THEME
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
