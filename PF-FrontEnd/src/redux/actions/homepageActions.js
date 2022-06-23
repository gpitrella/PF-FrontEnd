import axios from 'axios';
import {
  TEST_HOMEPAGE,
  ALL_CATEGORIES,
  GET_BRANDS,
  GET_PRODUCT_DETAILS
} from './actiontype';

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
