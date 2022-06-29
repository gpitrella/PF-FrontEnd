import axios from 'axios';
import {
   CREATE_CATEGORY,
   UPDATE_CATEGORY,
   DELETE_CATEGORY,
   CREATE_BRAND,
   UPDATE_BRAND,
   DELETE_BRAND,
   PRODUCTS_TO_FORMS,
} from './actiontype';

export const createCategory = ({ name }) => {
    return async (dispatch) => {
        try{
            let categCreated = await axios.post("http://localhost:3001/api/categories", { name });
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

  export const updateCategory = ({ id }) =>{
    return async (dispatch) => {
        
    }
  };
  
  export const getProductsToForms = function(){
    return async (dispatch)=>{
      try{
        var filenames = [1, 2, 3].map(function (n) {
          return `http://localhost:3001/api/product/?page=${n}`;
      });
      async function axiosGet (file) {
          return axios.get(file)
      };
      const promises = filenames.map(file => axiosGet(file));
      const productsToForms = await Promise.all(promises);
      return dispatch({ type: PRODUCTS_TO_FORMS, payload: productsToForms.data });
      }catch(e){
        console.log(e);
        return e;
      }
    }
  };  