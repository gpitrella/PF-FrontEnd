import axios from 'axios';
import {
  TEST_HOMEPAGE,
  ALL_CATEGORIES,
  GET_BRANDS,
  GET_PRODUCT_DETAILS,
  GET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  SHOW_LOADING_SECTION_ONE,
  SHOW_LOADING_SECTION_TWO,
  SHOW_LOADING_SECTION_THREE,
  GET_PRODUCT_TO_SECTION_ONE,
  GET_PRODUCT_TO_SECTION_TWO,
  GET_PRODUCT_TO_SECTION_THREE,
  SHOW_ERROR_SECTION_ONE,
  SHOW_ERROR_SECTION_TWO,
  SHOW_ERROR_SECTION_THREE,
  RESET_SECTIONS,
  BASE_URL
} from './actiontype';

const PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE = `${BASE_URL}/api/product/?`;

export const testHomePage = function() {
  return {
    type: TEST_HOMEPAGE
  }
}

export const getCategories = function () {
  return async (dispatch) => {
    try{
        let totalCategories = await axios.get(`${BASE_URL}/api/categories`);
        dispatch({
            type: ALL_CATEGORIES,
            payload: totalCategories.data
        });
    }catch(e){
        console.log(e);
        return e;
    }
  }
};

export const getBrands = function() {
  return async (dispatch)=>{
    const res = await axios(`${BASE_URL}/api/manufacturer`);
    return dispatch({ type: GET_BRANDS, payload: res.data });
}
}
// Get Product Details:
export function getProductDetails(id){
  return function(dispatch){
      return axios.get(`${BASE_URL}/api/product/${id}`)
                  .then(product => dispatch({ type: GET_PRODUCT_DETAILS, payload: product.data[0]}))
                  .catch(error => console.log(error))
  }
};

// Get Search Bar Products: 
export function getSearchProducts(name){
  return function(dispatch){
      
      return axios.get(`${BASE_URL}/api/product/?size=7&name=${name}`)
                  .then(product => dispatch({ type: GET_SEARCH_PRODUCTS, payload: product.data}))
                  .catch(error => console.log(error))
  }
};

// Clear Search Products:
export function clearSearchProducts(){
  return function(dispatch){
      dispatch({ type: CLEAR_SEARCH_PRODUCTS})
  }
};

// Para las secciones:
export const showLoadingSectionOne = function() {
  return {
    type: SHOW_LOADING_SECTION_ONE
  }
}

export const showLoadingSectionTwo = function() {
  return {
    type: SHOW_LOADING_SECTION_TWO
  }
}

export const showLoadingSectionThree = function() {
  return {
    type: SHOW_LOADING_SECTION_THREE
  }
}

export const getProductsToSectionOne = function(filterQuery = 'page=1') {
  return function(dispatch) {
    return fetch(`${PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE}${filterQuery}`)
           .then(result => result.json())
           .then(data =>  dispatch({ type: GET_PRODUCT_TO_SECTION_ONE, payload: data }))
           .catch(error => dispatch({ type: SHOW_ERROR_SECTION_ONE }));
  }
}

export const getProductsToSectionTwo = function(filterQuery = 'page=1') {
  return function(dispatch) {
    return fetch(`${PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE}${filterQuery}`)
           .then(result => result.json())
           .then(data =>  dispatch({ type: GET_PRODUCT_TO_SECTION_TWO, payload: data }))
           .catch(error => dispatch({ type: SHOW_ERROR_SECTION_TWO }));
  }
}

export const getProductsToSectionThree = function(filterQuery = 'page=1') {
  return function(dispatch) {
    return fetch(`${PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE}${filterQuery}`)
           .then(result => result.json())
           .then(data =>  dispatch({ type: GET_PRODUCT_TO_SECTION_THREE, payload: data }))
           .catch(error => dispatch({ type: SHOW_ERROR_SECTION_THREE }));
  }
}

export const resetSections = function() {
  return {
    type: RESET_SECTIONS
  }
}
// Fin para las secciones.
