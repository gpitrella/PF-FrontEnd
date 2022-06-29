import {
  GET_BRANDS_TO_STORE,
  GET_CATEGORIES_TO_STORE,
  GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE,
  UPDATE_FILTER,
  RESET_FILTER,
  SHOW_LOADING,
  SHOW_ERROR,
  SHOW_STORE,
  CLOSE_STORE,
  POST_PRODUCT,
  PUT_PRODUCT,
} from '../actions/actiontype';

const ORDER_BY_PRICE = "price";
const ORDER_BY_NAME = "name";

const initialState = {

  showStore: false,
  showLoading: false,
  showError: false,

  filter: {
    size: 10,
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
    name: '',
  },

  categories: [ // Las categorias para el filtro.
    // 'None',
    // 'Prebuild-Computers',
    // 'Notebooks',
    // 'Headphones',
    // 'Keyboards',
    // 'Mouses',
    // 'Monitors',
    // 'Hard Disk Drives',
    // 'Graphic-Cards',
    // 'CPU-Processors',
    // 'Modems-Routers'
  ],

  brands: [ // Las marcas para el filtro.
    // 'AMD',
    // 'INTEL'
  ],

  msn: [],

  results: 0,
  products: [],
  noProducts: false,

  resultPut: {},
};

const storepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case GET_BRANDS_TO_STORE:
      return {
        ...state,
        brands: payload.map(brand => brand.name),
        showStore: state.categories.length > 0
      }
    case GET_CATEGORIES_TO_STORE:
      return { 
        ...state,
        categories: ['None'].concat(payload.map(category => category.name)),
        showStore: state.brands.length > 0
      }
    case GET_PRODUCTS_WITH_FILTERS_AND_PAGINATE:
      return {
        ...state,
        products: payload.content,
        showLoading: false,
        filter: {
          ...state.filter,
          pages: payload.totalPages
        },
        noProducts: payload.content.length === 0,
        results: payload.results
      }
    case SHOW_LOADING:
      return {
        ...state,
        products: [],
        showLoading: true,
        noProducts: false,
        showError: false
      }
    case SHOW_ERROR:
      return {
        ...state,
        showLoading: false,
        showError: true,
        pages: 1,
        page: 1,
        results: 0
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
          page: 1,
          name: ''
        }
      }
    case POST_PRODUCT:
          return {
          ...state,
          msn: ['Product created!']
          }
    case PUT_PRODUCT:
      return {
        ...state,
        resultPut: {
          status: true
        }
      }
    case CLOSE_STORE:
      return { ...initialState };
    default:
      return state;
  }
}

export default storepageReducer;