import axios from 'axios';
import {
  TEST_HOMEPAGE,
  GET_BRANDS,
  GET_PRODUCT_DETAILS,
  GET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS
} from './actiontype';

export const testHomePage = function() {
  return {
    type: TEST_HOMEPAGE
  }
}

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
                  .then(console.log('productos buscados'))
                  .catch(error => console.log(error))
  }
};

// Clear Search Products:
export function clearSearchProducts(){
  return function(dispatch){
      console.log('Borrando search product')
       dispatch({ type: CLEAR_SEARCH_PRODUCTS})
  }
};