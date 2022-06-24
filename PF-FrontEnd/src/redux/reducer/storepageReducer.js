import {
  UPDATE_FILTER,
  RESET_FILTER,
  GET_PRODUCTS,
} from '../actions/actiontype';

const ORDER_BY_PRICE = "price";
const ORDER_BY_NAME = "name";

const initialState = {
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
    pages: 10,
  },
  categories: [
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
  brands: [
    'AMD',
    'INTEL'
  ],
  products: []
};

const storepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
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
      case GET_PRODUCTS:
        return {
          ...state,
          products: payload
        }
    default:
      return state;
  }
}

export default storepageReducer;