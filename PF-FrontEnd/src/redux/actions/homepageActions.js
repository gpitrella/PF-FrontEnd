import axios from 'axios';
import {
  TEST_HOMEPAGE,
  ALL_CATEGORIES,
  CREATE_CATEGORY,
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
