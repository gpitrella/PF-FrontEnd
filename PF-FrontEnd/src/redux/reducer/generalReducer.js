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
  SHOW_FAVOURITES,
  CLOSE_FAVOURITES,
  SUCCESS_BUY,
  LOG_IN_ERROR,
  LOGIN_WITH_GOOGLE,
  NOT_LOGIN_WITH_GOOGLE,
  CLOSE_LANDING,
  GET_ORDER_BY_USER,
  POST_NEW_ORDER,
  GET_BRANCHS_OFFICES_WITH_DISTANCE,
  RESET_CHECKOUT_ADDRESS,
  SHOW_MODAL_ADD_IMAGE,
  CLOSE_MODAL_ADD_IMAGE,
  UPLOAD_IMAGE,
  GET_BRANCH_OFFICES,
  FAVOURITES_CHARGED,
  REMOVE_FAVOURITES_CHARGED,
  GET_BRANCHES
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
  loadingUser: true,
  favouritesProducts: [],
  showFavs: false,
  viewLanding: true,
  logInError: {},
  orderByUser: {},
  favoritiesCharged: false,
  newFavoriteProduct: {},

  // Traer Sucursales con Distancia para el Checkout
  errorBranchOffices: false,
  branchOffices: [],
  branches:[],
  // La reutilizo en branchs.

  modalAddImage: {
    show: false,
    uploadedImage: '',
  }
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
        user: payload,
        showPageLoader: true
      }

    case LOG_IN:
      LocalStorage.saveItem('user', payload);      
      return {
        ...state,
        user: payload,
        showPageLoader: true
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
      LocalStorage.removeItem('productsCart');
      LocalStorage.removeItem('user');
      return {
        ...state,
        productsCart: [],
        user:{},
        showPageLoader: true
      }
    }
    case ADD_PRODUCT_TO_FAVOURITES:{
      return {
        ...state,
        newFavoriteProduct: payload        
      }
    }
    case GET_FAVOURITES_PRODUCTS: {
      return {
        ...state,
        favouritesProducts: payload
      }
    }

    case REMOVE_FAVOURITE_PRODUCT: {
      return {
      ...state,
      newFavoriteProduct: payload
      }
    }

    case FAVOURITES_CHARGED: {
      return {
        ...state,
        favoritiesCharged: true,
        newFavoriteProduct: {}
      }
    }

    case REMOVE_FAVOURITES_CHARGED: {
      return {
        ...state,
        favoritiesCharged: false
      }
    }

    case SHOW_FAVOURITES: {
      return {
        ...state,
        showFavs: true        
      }
    }

    case CLOSE_FAVOURITES: {
      return {
        ...state,
        showFavs: false
      }
    }

    case SUCCESS_BUY: {
      LocalStorage.removeItem('productsCart');
      return {
        ...state,
        productsCart: []
      }
    }

    case LOGIN_WITH_GOOGLE: {
      if (payload.user) LocalStorage.saveItem('user', payload); 
      return {
        ...state,
        user: payload,
        loadingUser: false
      }
    }

    case NOT_LOGIN_WITH_GOOGLE: {
      return {
        ...state,
        loadingUser: false
      }
    }

    case CLOSE_LANDING: {
      return {
        ...state,
        viewLanding: false
      }
    }

    case LOG_IN_ERROR: {
      return {
        ...state,
        logInError: payload
      }
    }

    case GET_ORDER_BY_USER: {
      return {
        ...state,
        orderByUser: payload
      }
    };
    // Traer sucursales con distancia
    case GET_BRANCHS_OFFICES_WITH_DISTANCE:

      if (payload.error) return { ...state, errorBranchOffices: true };

      payload.sort((prev, next) => prev.distance - next.distance);
      
      return {
        ...state,
        branchOffices: payload,
        errorBranchOffices: false
      };

    case RESET_CHECKOUT_ADDRESS:
      return {
        ...state,
        errorBranchOffices: false,
        branchOffices: [],
      }

    // Modal para subir imagenes

    case SHOW_MODAL_ADD_IMAGE:
      return {
        ...state,
        modalAddImage: {
          ...state.modalAddImage,
          show: true,
          uploadedImage: '',
        }
      }

    case CLOSE_MODAL_ADD_IMAGE:
      return {
        ...state,
        modalAddImage: {
          ...state.modalAddImage,
          show: false,
          uploadedImage: ''
        }
      }

    case UPLOAD_IMAGE:
      return {
        ...state,
        modalAddImage: {
          ...state.modalAddImage,
          uploadedImage: payload.secure_url
        }
      }

    case GET_BRANCH_OFFICES:
      return {
        ...state,
        branchOffices: payload,
        errorBranchOffices: false
      }

    case GET_BRANCHES:
      return {
        ...state,
        branches: payload,
    }

    default:
      return state;
  }
}

export default generalReducer;