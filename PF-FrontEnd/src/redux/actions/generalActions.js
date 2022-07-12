import axios from 'axios';

import {
  CHANGE_THEME,
  SHOW_MINI_MODAL,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_CART,
  INCREASE_QUANTITY_PRODUCT,
  REDUCE_QUANTITY_PRODUCT,
  POST_COMMENT_PRODUCT,
  SHOW_CART,
  CLOSE_CART,
  FINISH_ORDER,
  SIGN_UP,
  LOG_IN,
  LOGOUT,
  POST_REVIEW_PRODUCT,
  LOAD_STORAGE,
  OPEN_PAGE_LOADER,
  CLOSE_PAGE_LOADER,
  ADD_PRODUCT_TO_FAVOURITES,
  GET_FAVOURITES_PRODUCTS,
  REMOVE_FAVOURITE_PRODUCT,
  SHOW_FAVOURITES,
  CLOSE_FAVOURITES,
  BASE_URL,
  SUCCESS_BUY,
  LOG_IN_ERROR,
  LOGIN_WITH_GOOGLE,
  NOT_LOGIN_WITH_GOOGLE,
  CLOSE_LANDING,
  GET_ORDER_BY_USER,
  EDIT_STATUS_ORDER,
  POST_NEW_ORDER,
  GET_BRANCHS_OFFICES_WITH_DISTANCE,
  RESET_CHECKOUT_ADDRESS,
  SHOW_MODAL_ADD_IMAGE,
  CLOSE_MODAL_ADD_IMAGE,
  UPLOAD_IMAGE,
  CLOUDINARY,
  GET_BRANCH_OFFICES,
  FAVOURITES_CHARGED,
  REMOVE_FAVOURITES_CHARGED
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
      return axios.get(`${BASE_URL}/api/product/${id}`)
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
export const postCommentProduct = function(comment, idProduct, idUser) {
  return function(dispatch){
    return axios.post(`${BASE_URL}/api/comments`, {comment, idProduct, idUser})
                .then(comment => dispatch({ type: POST_COMMENT_PRODUCT, payload: comment.data}))
                .catch(error => console.log(error))
  }
};

export const signUp = function(name, email, password) {
  return function(dispatch){
    return axios.post(`${BASE_URL}/api/signup`, {name, email, password})
                .then(data => dispatch({ type: SIGN_UP, payload: data.data}))
                .catch(error => dispatch({ type: LOG_IN_ERROR, payload: error.response}))
  }
};

export const logIn = function(email, password) {
  return function(dispatch){
    return axios.post(`${BASE_URL}/api/signin`, {email, password})
                .then(data => dispatch({ type: LOG_IN, payload: data.data}))
                .catch(error => dispatch({ type: LOG_IN_ERROR, payload: error.response}))
  }
};

export const showMiniModal = function(show = true, msg = '', success = false, error = false) {
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
export const finishOrder = function( email,items, idUser, totalpurchase, idAddress, branchOfficeId ) {
  return function(dispatch){
    return axios.post(`${BASE_URL}/api/payment`, {email,items, idUser, totalpurchase, idAddress, branchOfficeId})
                .then(payment => dispatch({ type: FINISH_ORDER, payload: payment}))
                .catch(error => console.log(error))
  }
};

// Create Review product
export const postReviewProduct = function( comment, score, idProduct, idUser) {
  return function(dispatch){
    return axios.post(`${BASE_URL}/api/review`, {comment, score, idProduct, idUser})
                .then(comment => dispatch({ type: POST_REVIEW_PRODUCT, payload: comment.data}))
                .catch(error => console.log(error))
  }
};

export const loadStorage = function() {
  return {
    type: LOAD_STORAGE
  }
};

export const openPageLoader = function() {
  return {
    type: OPEN_PAGE_LOADER
  }
};

export const closePageLoader = function() {
  return {
    type: CLOSE_PAGE_LOADER
  }
};

export const logout = function() {
  return function(dispatch){
    return axios.get(`${BASE_URL}/auth/logout/`, { withCredentials: true })
                .then(product => dispatch({ type: LOGOUT }))
                .catch(error => dispatch({ type: LOGOUT }))
  }
};

//FAVOURITES PRODUCTS
export function addProdToFavourites({ idUser, idProduct }){
  console.log(idUser, idProduct)
  return function(dispatch){
      return axios.post(`${BASE_URL}/api/favorite`, { idUser, idProduct } )
                  .then(response => dispatch({ type: ADD_PRODUCT_TO_FAVOURITES, payload: response.data }))
                  .catch(error => console.log(error))
  }
};

export function getFavouritesProducts(idUser){
  return function(dispatch){
    return axios.get(`${BASE_URL}/api/ProfileUser/favorites/${idUser}`) 
    .then(response => dispatch({ type: GET_FAVOURITES_PRODUCTS, payload: response.data }))
    .catch(error => console.log(error))
  };
};

export function favoritesCharged(){
  return {
    type: FAVOURITES_CHARGED
  }
}

export function removeFavoritesCharged(){
  return {
    type: REMOVE_FAVOURITES_CHARGED
  }
}

export function removeFavourite( id ){
  console.log(id);
  return function(dispatch){
      return axios.delete(`${BASE_URL}/api/favorite`, { data: { id: id.id } })
      .then(response => dispatch({ type: REMOVE_FAVOURITE_PRODUCT, payload: response.data }))
      .catch(error => console.log(error))
  };
};

export function showFavs(){
  return {
    type: SHOW_FAVOURITES,
  }
};

export function closeFavs(){
  return {
    type: CLOSE_FAVOURITES,
  }
};

// Success Buy - Remove Product from Cart
export function successBuyAction(){
  return {
      type: SUCCESS_BUY
  }
};

export function loginWithGoogle() {
  return function(dispatch){
    return axios.get(`${BASE_URL}/auth/login/success`, { withCredentials: true })
    .then(data => {
      dispatch({ type: LOGIN_WITH_GOOGLE, payload: data.data.user }) })
    .catch(error => dispatch({ type: LOGIN_WITH_GOOGLE, payload: {} }))
  };
}

export function notLoginWithGoogle() {
  return {
    type: NOT_LOGIN_WITH_GOOGLE
  }
}

// Close Landing:
export function closeLanding(){
  return {
    type: CLOSE_LANDING,
  }
};

// Get Order By User:
export function getOrderByUser(idUser){
  return function(dispatch){
    return axios.get(`${BASE_URL}/api/orders/users/${idUser}`)
        .then(response => dispatch({ type: GET_ORDER_BY_USER, payload: response.data }))
        .catch(error => console.log(error))
  };
};

// Put Status By Order:
export function putStatusByOrder(id, status){
  return function(dispatch){
    return axios.put(`${BASE_URL}/api/orders`, { id, status })
        .then(response => console.log('Order updated'))
        .catch(error => console.log(error))
  };
};

// Traer sucursales con distancia
export function getBranchsOfficesWithDistance(lat, long) {
  return function(dispatch) {
    return axios.get(`${BASE_URL}/api/branchOffice?lat=${lat}&long=${long}`)
      .then(response => dispatch({ type: GET_BRANCHS_OFFICES_WITH_DISTANCE, payload: response.data }))
      .catch(error => dispatch({ type: GET_BRANCHS_OFFICES_WITH_DISTANCE, payload: { error: true } }))
  }
}

export function resetCheckoutAddress() {
  return {
    type: RESET_CHECKOUT_ADDRESS
  }
}

// Modal para subir imagen:
export function showModalAddImage() {
  return {
    type: SHOW_MODAL_ADD_IMAGE
  }
}

export function closeModalAddImage() {
  return {
    type: CLOSE_MODAL_ADD_IMAGE
  }
}

export function uploadImage(formData) {
  return function(dispatch) {
    return fetch(`${CLOUDINARY}`, { method: 'POST', body: formData })
      .then(response => response.json())
      .then(data => dispatch({ type: UPLOAD_IMAGE, payload: data }))
      .catch(error => console.LOG(error));
  }
}

export function getBranchOffices() {
  return function(dispatch) {
    return fetch(`${BASE_URL}/api/branchOffice`)
           .then(response => response.json())
           .then(data => dispatch({ type: GET_BRANCH_OFFICES, payload: data }))
           .catch(error => dispatch({ type: GET_BRANCHS_OFFICES_WITH_DISTANCE, payload: { error: true } }))
  }
}