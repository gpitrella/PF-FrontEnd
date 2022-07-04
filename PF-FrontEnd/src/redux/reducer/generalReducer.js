import { stepButtonClasses } from '@mui/material';
import { showCart } from '../actions';
import {
  CHANGE_THEME,
  SHOW_MINI_MODAL,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_CART,
  INCREASE_QUANTITY_PRODUCT,
  REDUCE_QUANTITY_PRODUCT,
  POST_COMMENT_PRODUCT,
  SHOW_CART,
  CLOSE_CART,
  FINISH_ORDER,
  SIGN_UP,
  LOG_IN,
  LOGOUT,
  POST_REVIEW_PRODUCT,
  OPEN_PAGE_LOADER,
  CLOSE_PAGE_LOADER,
  LOAD_STORAGE,
  ADD_PRODUCT_TO_FAVOURITES,
  GET_FAVOURITES_PRODUCTS,
  REMOVE_FAVOURITE_PRODUCT,
} from '../actions/actiontype';

import { LocalStorage } from '../../util/localStorage';

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}

const initialState = {
  theme: 'lightTheme',
  miniModal: {
    show: false,
    msg: '',
    success: false,
    error: false,
  },
  productsCart: [],
  commentCreated: {},
  user:{},
  showCart: false,
  finishOrder: {},
  reviewCreated: {},
  showPageLoader: true,
  favouritesProducts: [],
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
      LocalStorage.saveItem('theme', THEME[payload]);
      return {
        ...state,
        theme: THEME[payload]
      }

    case SHOW_MINI_MODAL:
      return {
        ...state,
        miniModal: {
          show: payload.show,
          msg: payload.msg ? payload.msg : '',
          success: payload.success ? payload.success : false,
          error: payload.error ? payload.error : false,
        }
      }
    
    case ADD_PRODUCT_TO_CART:
      console.log(payload)
      LocalStorage.saveItem('productsCart', state.productsCart.concat({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          image: payload.image,
          discount: payload.discount,
          stock: payload.stock,
          categories: payload.categories,
          description: payload.description,
          quantity: 1
        }));
      return {
        ...state,
        productsCart: state.productsCart.concat({
          id: payload.id,
          name: payload.name,
          price: payload.price,
          image: payload.image,
          discount: payload.discount,
          stock: payload.stock,
          categories: payload.categories,
          description: payload.description,
          quantity: 1
        })
      }

    case REMOVE_PRODUCT_CART:
      LocalStorage.saveItem('productsCart', state.productsCart.filter(product => product.id !== payload));
      return {
        ...state,
        productsCart: state.productsCart.filter(product => product.id !== payload)
      }

    case INCREASE_QUANTITY_PRODUCT: 
      state.productsCart.forEach((product) => {
        if(product.id === payload){
          product.quantity += 1
        }
      })
      LocalStorage.saveItem('productsCart', state.productsCart);
      return {
        ...state,
      }

    case REDUCE_QUANTITY_PRODUCT:
      state.productsCart.forEach((product) => {
        if(product.id === payload){
          product.quantity -= 1
        }
      }) 
      LocalStorage.saveItem('productsCart', state.productsCart);
      return {
        ...state, 
      }

    case POST_COMMENT_PRODUCT:
      return {
        ...state,
        commentCreated: payload
      }

    case SIGN_UP:
      LocalStorage.saveItem('user', payload);
      return {
        ...state,
        user: payload
      }

    case LOG_IN:
      LocalStorage.saveItem('user', payload);      
      return {
        ...state,
        user: payload
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

    case FINISH_ORDER:
      return {
        ...state,
        finishOrder: payload
      }
    case POST_REVIEW_PRODUCT:
      return {
        ...state,
        reviewCreated: payload
      }

    case LOAD_STORAGE: {
      let theme = LocalStorage.getItem('theme');
      let user = LocalStorage.getItem('user');
      let productsCart = LocalStorage.getItem('productsCart');
      return {
        ...state,
        theme: theme ? theme : state.theme,
        user: user ? user : state.user,
        productsCart: productsCart ? productsCart : state.productsCart
      }
    }
    case OPEN_PAGE_LOADER: {
      return {
        ...state,
        showPageLoader: true,
      }
    }
    case CLOSE_PAGE_LOADER: {
      return {
        ...state,
        showPageLoader: false,
      }
    }
    case LOGOUT: {
      LocalStorage.removeItem('user');
      return {
        ...state,
        user:{}
      }
    }
    case ADD_PRODUCT_TO_FAVOURITES:{
      LocalStorage.saveItem('favouritesProducst', state.favouritesProducts.concat({
        id: payload.id,
        name: payload.name,
        price: payload.price,
        image: payload.image,
        discount: payload.discount,
        stock: payload.stock,
        categories: payload.categories,
        description: payload.description,
        user: payload.userId,
      }));
    return {
      ...state,
      favouritesProducts: state.favouritesProducts.concat({
        id: payload.id,
        user: payload.userId,
      })
    }}
    case GET_FAVOURITES_PRODUCTS: {
      return {
        ...state,
        favouritesProducts: payload
      }
    }
    case REMOVE_FAVOURITE_PRODUCT: {
      LocalStorage.saveItem('productsCart', state.favouritesProducts.filter(product => product.id !== payload));
      return {
      ...state,
      favouritesProducts: state.favouritesProducts.filter(product => product.id !== payload)
      }
    }
    default:
      return state;
  }
}

export default generalReducer;