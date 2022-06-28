import axios from 'axios';
import {
  CHANGE_THEME,
  ADD_TO_CART,
  POST_COMMENT_PRODUCT
} from './actiontype';

// Change color Theme - Night / Day:
export const changeTheme = function() {
  return {
    type: CHANGE_THEME
  }
}

// Add To CART - Get Product Details:
export function getProductDetailsAddtoCart(id){
  return function(dispatch){
      return axios.get(`http://localhost:3001/api/product/${id}`)
                  .then(product => dispatch({ type: ADD_TO_CART, payload: product.data[0]}))
                  .catch(error => console.log(error))
  }
};

// Create comments product
export const postCommentProduct = function(comment, id) {
  return function(dispatch){
    return axios.post(`http://localhost:3001/api/comments`, {comment, id})
                .then(comment => dispatch({ type: POST_COMMENT_PRODUCT, payload: comment.data}))
                .catch(error => console.log(error))
  }
};
