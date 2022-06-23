import {
  UPDATE_FILTER,
  RESET_FILTER,
  SHOW_LOADING,
  SHOW_ERROR,
  SHOW_STORE,
  CLOSE_STORE
} from '../actions/actiontype';

const ORDER_BY_PRICE = "price";
const ORDER_BY_NAME = "name";

const initialState = {

  showStore: false,
  showLoading: false,
  showError: false,

  filter: {
    favorites: false,
    discount: false,
    category: 'None',
    brand: [],
    minPrice: '',
    maxPrice: '',
    order: 'asc',
    orderBy: ORDER_BY_NAME,
    page: 1,
    pages: 1,
  },

  categories: [ // Las categorias para el filtro.
    'None',
    'Prebuild-Computers',
    'Notebooks',
    'Headphones',
    'Keyboards',
    'Mouses',
    'Monitors',
    'Hard Disk Drives',
    'Graphic-Cards',
    'CPU-Processors',
    'Modems-Routers'
  ],

  brands: [ // Las marcas para el filtro.
    'AMD',
    'INTEL'
  ]
};

const storepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case SHOW_LOADING:
      return {
        ...state,
        showLoading: true
      }
    case SHOW_ERROR:
      return {
        ...state,
        showLoading: false,
        showError: true
      }
    case SHOW_STORE:
      return {
        ...state,
        showStore: true
      }
    case UPDATE_FILTER:
      return {
        ...state,
        filter: { ...payload }
      }
    case RESET_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          favorites: false,
          discount: false,
          category: 'None',
          brand: [],
          minPrice: '',
          maxPrice: '',
          page: 1
        }
      }
    case CLOSE_STORE:
      return initialState;
    default:
      return state;
  }
}

export default storepageReducer;