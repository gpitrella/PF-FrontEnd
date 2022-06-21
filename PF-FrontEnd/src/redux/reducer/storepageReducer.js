import {
  UPDATE_FILTER,
  RESET_FILTER
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
    orderBy: ORDER_BY_NAME
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
  ]
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
        }
      }
    default:
      return state;
  }
}

export default storepageReducer;