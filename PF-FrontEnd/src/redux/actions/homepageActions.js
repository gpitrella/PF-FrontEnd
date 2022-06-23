import axios from 'axios';
import {
<<<<<<< HEAD
  TEST_HOMEPAGE, GET_BRANDS
=======
  TEST_HOMEPAGE,
  GET_PRODUCT_DETAILS
>>>>>>> 69d17867e19ff883bd42ddc88b17237221e177be
} from './actiontype';

export const testHomePage = function() {
  return {
    type: TEST_HOMEPAGE
  }
}

<<<<<<< HEAD
export const getBrands = function() {
  return async (dispatch)=>{
    const res = await axios('http://localhost:3001/api/manufacturer');
    return dispatch({ type: GET_BRANDS, payload: res.data });
}
}
=======
// Get Product Details:
export function getProductDetails(id){
  return function(dispatch){
      return axios.get(`http://localhost:3001/api/product/${id}`)
                  .then(product => dispatch({ type: GET_PRODUCT_DETAILS, payload: product.data[0]}))
                  .catch(error => console.log(error))
  }
};
>>>>>>> 69d17867e19ff883bd42ddc88b17237221e177be
