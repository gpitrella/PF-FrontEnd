import axios from 'axios';
import {
  //  CATEGORIES_TO_DASHBOARD,
   CREATE_CATEGORY,
   UPDATE_CATEGORY,
   DELETE_CATEGORY,
   CREATE_BRAND,
   UPDATE_BRAND,
   DELETE_BRAND,
   PRODUCTS_TO_FORMS,
} from './actiontype';

const PATH_GET_BRANDS = 'http://localhost:3001/api/manufacturer';
const PATH_GET_CATEGORIES = 'http://localhost:3001/api/categories';
const PATH_GET_ALL_PRODUCTS = 'http: //localhost:3001/api/product';


export const createCategory = ({ name }) => {
    return async (dispatch) => {
        try{
            let categCreated = await axios.post(`${PATH_GET_CATEGORIES}`, { name });
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

  export const updateCategory = ({ id, name }) => {
    return async (dispatch) => {
      try{
        const categoryEdited = await axios.put(`${PATH_GET_CATEGORIES}/${id}`, { name });
        dispatch({
          type: UPDATE_CATEGORY,
          payload: categoryEdited.data
        })
      }catch(e){
        console.log(e);
        return e;
      }        
    }
  };

  export const deleteCategory = (id) => {
    return async (dispatch) => {
      try{
        const categDeleted = axios.delete(`${PATH_GET_CATEGORIES}/${id}`);
        console.log(categDeleted);
        dispatch({
          type: DELETE_CATEGORY,
          payload: categDeleted.data })
        }catch(e){
          console.log(e);
          return e;
        }
    }
  };
  
  export const getProductsToForms = function(){
    return async (dispatch)=>{
      try{
        var filenames = [1, 2, 3].map(function (n) {
          return `${PATH_GET_ALL_PRODUCTS}/?page=${n}`;
      });
      async function axiosGet (file) {
          return axios.get(file)
      };
      const promises = filenames.map(file => axiosGet(file));
      const productsToForms = await Promise.all(promises);
      console.log(productsToForms)
      return dispatch({ type: PRODUCTS_TO_FORMS, payload: productsToForms.data });
      }catch(e){
        console.log(e);
        return e;
      }
    }
  };  

  export const createBrand = ({ name, image}) => {
    return async (dispatch) => {
        try{
            let brandCreated = await axios.post(`${PATH_GET_BRANDS}`, { name, image });
            dispatch({
                type: CREATE_BRAND,
                payload: brandCreated
            });
        }catch(error){
            console.log(error);
            return error;
        }
    }
  };

  export const updateBrand = ({ id, name }) => {
    return async (dispatch) => {
      try{
        const brandEdited = await axios.put(`${PATH_GET_BRANDS}/${id}`, { name });
        dispatch({
          type: UPDATE_BRAND,
          payload: brandEdited.data
        })
      }catch(e){
        console.log(e);
        return e;
      }        
    }
  };

  export const deleteBrand = (id) => {
    return async (dispatch) => {
      try{
        const brandDeleted = axios.delete(`${PATH_GET_BRANDS}/${id}`);
        console.log(brandDeleted);
        dispatch({
          type: DELETE_BRAND,
          payload: brandDeleted.data })
        }catch(e){
          console.log(e);
          return e;
        }
    }
  };
