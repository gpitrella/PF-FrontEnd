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
  POST_PRODUCT
} from './actiontype';

const PATH_GET_BRANDS = 'http://localhost:3001/api/manufacturer';
const PATH_GET_CATEGORIES = 'http://localhost:3001/api/categories';
const PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE = "http://localhost:3001/api/product/?";

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
    return fetch("http://localhost:3001/api/product", body)
           .then(result => result.json())
           .then(data => console.log(data))
           .catch(error => console.log(error));
  }
}