import { stepButtonClasses } from '@mui/material';
import { showCart } from '../actions';
import {
  CHANGE_THEME,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_CART,
  INCREASE_QUANTITY_PRODUCT,
  REDUCE_QUANTITY_PRODUCT,
  POST_COMMENT_PRODUCT,
  SHOW_CART,
  CLOSE_CART
} from '../actions/actiontype';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
  theme: 'lightTheme',
  productsCart: [],
  theme: 'darkTheme',
  commentCreated: {},
  showCart: false
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: THEME[payload]
      }
    
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        productsCart: state.productsCart.concat({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          image: payload.image,
          discount: payload.discount,
          stock: payload.stock,
          quantity: 1
        })
      }

    case REMOVE_PRODUCT_CART:
      return {
        ...state,
        productsCart: state.productsCart.filter(product => product.id !== payload)
      }

    case INCREASE_QUANTITY_PRODUCT: 
          state.productsCart.map((product) => {
            if(product.id === payload){
              product.quantity += 1
            }
          })
      return {
        ...state,
      }

    case REDUCE_QUANTITY_PRODUCT:
          state.productsCart.map((product) => {
            if(product.id === payload){
              product.quantity -= 1
            }
          }) 
      return {
        ...state, 
      }

    case POST_COMMENT_PRODUCT:
      return {
        ...state,
        commentCreated: payload
      }

    case SHOW_CART:
      return {
        ...state,
        showCart: true        
      }
    
    case CLOSE_CART:
      return {
        ...state,
        showCart: false
      }

      
    default:
      return state;
  }
}

export default generalReducer;