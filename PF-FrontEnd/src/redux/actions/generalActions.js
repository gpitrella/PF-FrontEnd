import axios from 'axios';
import {
  CHANGE_THEME,
  POST_COMMENT_PRODUCT,
  SIGN_UP
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

export const signUp = function(name, email, password) {
  return function(dispatch){
    return axios.post('http://localhost:3001/api/signup', {name, email, password})
                .then(data => dispatch({ type: SIGN_UP, payload: data.data}))
                .catch(error => console.log(error))
  }
}

export const logIn = function(email, password) {
  return function(dispatch){
    return axios.post('http://localhost:3001/api/signin', {email, password})
                .then(data => dispatch({ type: SIGN_UP, payload: data.data}))
                .catch(error => console.log(error))
  }
}
