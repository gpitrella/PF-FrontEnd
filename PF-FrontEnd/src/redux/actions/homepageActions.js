import axios from 'axios';
import {
  TEST_HOMEPAGE,
  ALL_CATEGORIES,
  CREATE_CATEGORY,
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
  SHOW_ERROR_SECTION_THREE
} from './actiontype';

const PATH_GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE = 'http://localhost:3001/api/product/?';

export const testHomePage = function() {
  return {
    type: TEST_HOMEPAGE
  }
}

export const getCategories = function () {
  return async (dispatch) => {
    try{
        let totalCategories = await axios.get("http://localhost:3001/api/categories");
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

export const createCategory = ({ name, image, products }) => {
  return async (dispatch) => {
      try{
          let categCreated = await axios.post("http://localhost:3001/categories", { name, image, products });
          dispatch({
              type: CREATE_CATEGORY,
              payload: categCreated
          });
      }catch(error){
          console.log(error);
          return error;
      }
  }
};


export const getBrands = function() {
  return async (dispatch)=>{
    const res = await axios('http://localhost:3001/api/manufacturer');
    return dispatch({ type: GET_BRANDS, payload: res.data });
}
}
// Get Product Details:
export function getProductDetails(id){
  return function(dispatch){
      return axios.get(`http://localhost:3001/api/product/${id}`)
                  .then(product => dispatch({ type: GET_PRODUCT_DETAILS, payload: product.data[0]}))
                  .catch(error => console.log(error))
  }
};

// Get Search Bar Products: 
export function getSearchProducts(name){
  return function(dispatch){
      
      return axios.get(`http://localhost:3001/api/product/?size=7&name=${name}`)
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
// Fin para las secciones.
