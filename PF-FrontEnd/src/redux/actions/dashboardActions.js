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
   BASE_URL,
   COUNT_ORDERS,
   SUM_ORDERS,
   SUM_ORDERS_TODAY,
   SUM_LAST_WEEK,
   SUM_LAST_MONTH,
   SUM_BEFORELAST_MONTH,
   SUM_LASTTHREE_MONTH,
   GET_ORDERS_TODAY,
   GET_ALL_COMMENTS,
   UPDATE_COMMENT_ANSWER
} from './actiontype';

const PATH_GET_BRANDS = `${BASE_URL}/api/manufacturer`;
const PATH_GET_CATEGORIES = `${BASE_URL}/api/categories`;
const PATH_GET_ALL_PRODUCTS = `${BASE_URL}/api/product`;
const PATH_COUNT_ORDERS = `${BASE_URL}/api/orders/count`;
const PATH_SUM_ORDERS = `${BASE_URL}/api/orders/sum`;
const PATH_SUM_ORDERS_TODAY = `${BASE_URL}/api/orders/sumtoday`;
const PATH_SUM_LAST_WEEK = `${BASE_URL}/api/orders/sumlastweek`;
const PATH_SUM_LAST_MONTH = `${BASE_URL}/api/orders/sumlastmonth`;
const PATH_SUM_BEFORELAST_MONTH = `${BASE_URL}/api/orders/sumbeforelastmonth`;
const PATH_SUM_LASTTHREE_MONTH = `${BASE_URL}/api/orders/sumlastthreemonth`;
const PATH_GET_ORDERS_TODAY = `${BASE_URL}/api/orders/today`;

export const getOrdersToday = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_GET_ORDERS_TODAY)
      .then((res) => dispatch({ type: GET_ORDERS_TODAY, payload: res.data }));
  };
};

export const countAllOrders = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_COUNT_ORDERS)
      .then((res) => dispatch({ type: COUNT_ORDERS, payload: res.data }));
  };
};

export const sumAllOrders = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_SUM_ORDERS)
      .then((res) => dispatch({ type: SUM_ORDERS, payload: res.data }));
  };
};

export const sumAllToday = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_SUM_ORDERS_TODAY)
      .then((res) => dispatch({ type: SUM_ORDERS_TODAY, payload: res.data }));
  };
};

export const sumLastWeek = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_SUM_LAST_WEEK)
      .then((res) => dispatch({ type: SUM_LAST_WEEK, payload: res.data }));
  };
};

export const sumLastMonth = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_SUM_LAST_MONTH)
      .then((res) => dispatch({ type: SUM_LAST_MONTH, payload: res.data }));
  };
};

export const sumBeforeLastMonth = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_SUM_BEFORELAST_MONTH)
      .then((res) => dispatch({ type: SUM_BEFORELAST_MONTH, payload: res.data }));
  };
};

export const sumLastThreeMonth = function(){
  return async (dispatch) => {
    return await axios
      .get(PATH_SUM_LASTTHREE_MONTH)
      .then((res) => dispatch({ type: SUM_LASTTHREE_MONTH, payload: res.data }));
  };
};

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

  export const updateBrand = ({ id, name, image }) => {
    return async (dispatch) => {
      try{
        const brandEdited = await axios.put(`${PATH_GET_BRANDS}/${id}`, { name, image });
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

  
  export function getAllComments( ){
    return function(dispatch){
        return axios.get(`${BASE_URL}/api/comments`)
        .then(response => dispatch({ type: GET_ALL_COMMENTS, payload: response.data }))
        .catch(error => console.log(error))
    };
  };

  //Put Comment Answer
export const putCommentAnswer = function(data) {
  return function(dispatch){
    return axios.put(`${BASE_URL}/api/comments`, {idComment: data.id, answer: data.answer})
                .then(comment => dispatch({type: UPDATE_COMMENT_ANSWER}))
                .catch(error => console.log(error))
  }
};

