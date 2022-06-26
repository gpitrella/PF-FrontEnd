import axios from 'axios';
import {
  CHANGE_THEME,
  ADD_TO_CART
} from './actiontype';

export const changeTheme = function() {
  return {
    type: CHANGE_THEME
  }
}

// Add To CART - Get Product Details:
export function getProductDetailsAddtoCard(id){
  return function(dispatch){
      return axios.get(`http://localhost:3001/api/product/${id}`)
                  .then(product => dispatch({ type: ADD_TO_CART, payload: product.data[0]}))
                  .catch(error => console.log(error))
  }
};