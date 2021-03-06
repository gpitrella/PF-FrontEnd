import {
  GET_BRANDS,
  TEST_HOMEPAGE,
  GET_PRODUCT_DETAILS,
  GET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  ALL_CATEGORIES,
  SHOW_LOADING_SECTION_ONE,
  SHOW_LOADING_SECTION_TWO,
  SHOW_LOADING_SECTION_THREE,
  GET_PRODUCT_TO_SECTION_ONE,
  GET_PRODUCT_TO_SECTION_TWO,
  GET_PRODUCT_TO_SECTION_THREE,
  SHOW_ERROR_SECTION_ONE,
  SHOW_ERROR_SECTION_TWO,
  SHOW_ERROR_SECTION_THREE,
  RESET_SECTIONS
} from '../actions/actiontype';

const initialState = {
  test: false,
  allCategories: [],
  brandsList: [],
  productDetails: {},
  searchProducts: {},
  section: {
    one: [],
    two: [],
    three: [],
    showLoadingOne: false,
    showLoadingTwo: false,
    showLoadingThree: false,
    errorOne: false,
    errorTwo: false,
    errorThree: false,
  },
  allProducts: []
};

const homepageReducer = function(state = initialState, { type, payload }) {
  switch(type) {
    case TEST_HOMEPAGE:
      return {
        ...state,
        test: !state.test
      }

    case ALL_CATEGORIES:
      return {
        ...state,
        allCategories: payload
      }

    case GET_BRANDS:
      return {
        ...state,
        brandsList: payload
      }

    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: payload          
        }

    case GET_SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: payload
      }
    
    case CLEAR_SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: {}
      }
    // Para las secciones
    case SHOW_LOADING_SECTION_ONE: {
      return {
        ...state,
        section: {
          ...state.section,
          errorOne: false,
          showLoadingOne: true
        }
      }
    }
    case SHOW_LOADING_SECTION_TWO: {
      return {
        ...state,
        section: {
          ...state.section,
          errorTwo: false,
          showLoadingTwo: true
        }
      }
    }
    case SHOW_LOADING_SECTION_THREE: {
      return {
        ...state,
        section: {
          ...state.section,
          errorThree: false,
          showLoadingThree: true
        }
      }
    }
    case GET_PRODUCT_TO_SECTION_ONE:
      return {
        ...state,
        section: {
          ...state.section,
          one: payload.content,
          showLoadingOne: false,
        }
      }
    case GET_PRODUCT_TO_SECTION_TWO:
      return {
        ...state,
        section: {
          ...state.section,
          two: payload.content,
          showLoadingTwo: false,
        }
      }
    case GET_PRODUCT_TO_SECTION_THREE:
      return {
        ...state,
        section: {
          ...state.section,
          three: payload.content,
          showLoadingThree: false,
        }
      }
    case SHOW_ERROR_SECTION_ONE:
      return {
        ...state,
        section: {
          ...state.section,
          errorOne: true
        }
      }
    case SHOW_ERROR_SECTION_TWO:
      return {
        ...state,
        section: {
          ...state.section,
          errorTwo: true
        }
      }
    case SHOW_ERROR_SECTION_THREE:
      return {
        ...state,
        section: {
          ...state.section,
          errorThree: true
        }
      }
    case RESET_SECTIONS:
      return {
        ...state,
        section: {
          ...initialState.section
        }
      }
    // Fin para las secciones.

    default:
      return state;
  }
}

export default homepageReducer;