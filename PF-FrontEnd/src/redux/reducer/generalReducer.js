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
  LOG_IN
} from '../actions/actiontype';

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
  finishOrder: {}
};

const generalReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case CHANGE_THEME:
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
    case SIGN_UP:
      return {
        ...state,
        user: payload
      }
    case LOG_IN:
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

    default:
      return state;
  }
}

export default generalReducer;