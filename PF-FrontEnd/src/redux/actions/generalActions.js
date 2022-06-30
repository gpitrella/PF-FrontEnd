import axios from 'axios';


import {
  CHANGE_THEME,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_CART,
  INCREASE_QUANTITY_PRODUCT,
  REDUCE_QUANTITY_PRODUCT,
  POST_COMMENT_PRODUCT,
  SHOW_CART,
  CLOSE_CART,
  FINISH_ORDER
} from './actiontype';


// Change color Theme - Night / Day:
export const changeTheme = function(theme) {
  return {
    type: CHANGE_THEME,
    payload: theme
  }
}

// Add To CART
export function addProductToCart(id){
  return function(dispatch){
      return axios.get(`http://localhost:3001/api/product/${id}`)
                  .then(product => dispatch({ type: ADD_PRODUCT_TO_CART, payload: product.data[0]}))
                  .catch(error => console.log(error))
  }
};

// Remove To CART:
export function removeProductFromCart(id){
  return function(dispatch){
      dispatch({ type: REMOVE_PRODUCT_CART, payload: id})
  }
};

// Add Quantity To Product CART:
export function increaseQuantityToProductCart(id){
  return function(dispatch){
    console.log('entre a general action')

      dispatch({ type: INCREASE_QUANTITY_PRODUCT, payload: id})
  }
};

// Add Amount To Product CART:
export function reduceQuantityToProductCart(id){
  return function(dispatch){
      dispatch({ type: REDUCE_QUANTITY_PRODUCT, payload: id})
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

// Show Cart:
export function showCart(){
  return {
    type: SHOW_CART,
  }
};

// Show Cart:
export function closeCart(){
  return {
    type: CLOSE_CART,
  }
};

// Finish Order:
export const finishOrder = function(order) {
  return function(dispatch){
    return axios.post(`http://localhost:3001/api/payment`, {order})
                .then(payment => dispatch({ type: FINISH_ORDER, payload: payment}))
                .catch(error => console.log(error))
  }
};