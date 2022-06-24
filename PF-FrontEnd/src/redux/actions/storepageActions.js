import {
  UPDATE_FILTER,
  RESET_FILTER, 
  GET_PRODUCTS,
} from './actiontype';
import axios from 'axios';

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

export const getProducts = function() {
  return async (dispatch) => {
    await axios.get("http://localhost:3001/api/product/")
    .then(response => dispatch({ type: GET_PRODUCTS, payload: response.data  }))
    .catch(error => console.log(error))       
  } 
}