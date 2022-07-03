import {
  UPDATE_FILTER,
  RESET_FILTER,
  SHOW_LOADING,
  SHOW_ERROR,
  SHOW_STORE,
  CLOSE_STORE,
  GET_BRANDS_TO_STORE,
  GET_CATEGORIES_TO_STORE,
  GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE,
  POST_PRODUCT,
  WAITING_RESPONSE_PUT,
  PUT_PRODUCT,
  ERROR_PUT_PRODUCT,
  WAITING_RESPONSE_DELETE,
  DELETE_PRODUCT,
  ERROR_DELETE_PRODUCT,
  BASE_URL
} from './actiontype';

import axios from 'axios'

const PATH_GET_BRANDS = `${BASE_URL}/api/manufacturer`;
const PATH_GET_CATEGORIES = `${BASE_URL}/api/categories`;
const PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE = `${BASE_URL}/api/product/?`;
const PATH_PUT_PRODUCT = `${BASE_URL}/api/product/`;
const PATH_DELETE_PRODUCT = `${BASE_URL}/api/product/`;

export const updateFilter = function(newFilter) {
  return {
    type: UPDATE_FILTER,
    payload: newFilter
  }
}

export const resetFilter = function() {
  return {
    type: RESET_FILTER
  }
}

export const setShowLoading = function() {
  return {
    type: SHOW_LOADING
  }
}

export const setShowStore = function() {
  return {
    type: SHOW_STORE
  }
}

export const closeStore = function() {
  return {
    type: CLOSE_STORE
  }
}

export const getProductsWithFiltersAndPaginate = function(filterQuery = 'page=1') {
  return function(dispatch) {
    return fetch(`${PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE}${filterQuery}`)
           .then(result => result.json())
           .then(data =>  dispatch({ type: GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE, payload: data }))
           .catch(error => dispatch({ type: SHOW_ERROR }));
  }
}

export const getBrandsToStore = function() {
  return function(dispatch) {
    return fetch(PATH_GET_BRANDS)
           .then(result => result.json())
           .then(data => dispatch({ type: GET_BRANDS_TO_STORE, payload: data }))
           .catch(error => console.log(error));
  }
}

export const getCategoriesToStore = function() {
  return function(dispatch) {
    return fetch(PATH_GET_CATEGORIES)
           .then(result => result.json())
           .then(data => dispatch({ type: GET_CATEGORIES_TO_STORE, payload: data }))
           .catch(error => console.log(error));
  }
}

export const postProduct = function(body) {
  return function(dispatch) {
    return axios.post(`${BASE_URL}/api/product`, body)
           .then(data => dispatch({ type: POST_PRODUCT, payload: data }))
           .catch(error => console.log(error));
  }
}

export const putProduct = function(id, body) {
  return function(dispatch) {
    return axios.put(`${PATH_PUT_PRODUCT}${id}`, body)
           .then(data => dispatch({ type: PUT_PRODUCT, payload: data }))
           .catch(error => dispatch({ type: ERROR_PUT_PRODUCT }));
  }
}

export const waitingResponsePut = function(status = false) {
  return {
    type: WAITING_RESPONSE_PUT,
    payload: status
  }
}

export const deleteProduct = function(id) {
  return function(dispatch) {
    return axios.delete(`${PATH_DELETE_PRODUCT}${id}`)
           .then(data => dispatch({ type: DELETE_PRODUCT, payload: data }))
           .catch(error => dispatch({ type: ERROR_DELETE_PRODUCT }));
  }
}

export const waitingResponseDelete = function(status = false) {
  return {
    type: WAITING_RESPONSE_DELETE,
    payload: status
  }
}