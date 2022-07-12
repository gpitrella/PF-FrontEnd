import {
  RESET_PURCHASES,
  SET_ORIGINAL_PURCHASES,
  UPDATE_FILTER_PURCHASES,
  SET_SHOW_LOADING_PURCHASES,
  GET_PURCHASES_WITH_FILTER_AND_PAGINATE,
  WAITING_RESPONSE_PUT_PURCHASE,
  PUT_PURCHASE,
  ERROR_PUT_PURCHASE,
  GET_ONE_PURCHASE_DETAILS,
  ERROR_ONE_PURCHASE_DETAILS,
  RESET_ONE_PURCHASE_DETAILS
} from "../actions/actiontype";

import { generatePurchasesWithFilter, formatPurchases } from '../../util';

const PURCHASES_STATUS_ENUM = [
  {
    value: 'pending',
    color: 'yellow'
  },
  {
    value: 'processing',
    color: 'orange'
  },
  {
    value: 'sending',
    color: 'blue'
  },
  {
    value: 'filled',
    color: 'green'
  },
  {
    value: 'cancelled',
    color: 'red'
  },
];

const initialState = {
  showPurchases: false,
  originalPurchases: [],
  purchases: [],
  showLoading: false,
  purchaseStatusEnum: [ ...PURCHASES_STATUS_ENUM ],

  filter: {
    order: 'asc',
    orderBy: 'status',
    sucursal: 'none',
    status: 'none',
    page: 1,
    pages: 1,
    results: 10
  },

  resultPut: {
    waitingResponse: false,
    status: false,
    error: false,
    errorMsg: '',
  },

  onePurchase: {
    details: {},
    loading: true,
    error: false
  }
}

const purchaseReducer = function(state = initialState, { type, payload }) {
    switch(type) {

      case RESET_PURCHASES:
        return {
          ...initialState
        }
      case SET_ORIGINAL_PURCHASES:
        let serverPurchases = formatPurchases(payload);
        let [ ogPurchases, ogFilter ] = generatePurchasesWithFilter(serverPurchases, state.filter);
        return {
          ...state,
          originalPurchases: serverPurchases,
          purchases: [ ...ogPurchases ],
          filter: { ...ogFilter },
          showPurchases: true,
          showLoading: false
        }
      case UPDATE_FILTER_PURCHASES:
        return {
          ...state,
          filter: { ...payload }
        }      
      case SET_SHOW_LOADING_PURCHASES:
        return {
          ...state,
          showLoading: true,
          purchases: []
        }
      case GET_PURCHASES_WITH_FILTER_AND_PAGINATE:
        let [ updatedPurchases, updatedFilter ] = generatePurchasesWithFilter(state.originalPurchases, payload);
        return {
          ...state,
          purchases: [ ...updatedPurchases ],
          filter: { ...updatedFilter },
          showLoading: false
        }
      case WAITING_RESPONSE_PUT_PURCHASE:
        return {
          ...state,
          resultPut: {
            ...state.resultPut,
            waitingResponse: payload,
            status: false,
            error: false,
            errorMsg: '',
          }
        }
      case PUT_PURCHASE:
        return {
          ...state,
          resultPut: {
            ...state.resultPut,
            status: true
          }
        }
      case ERROR_PUT_PURCHASE:
        return {
          ...state,
          resultPut: {
            ...state.resultPut,
            watingResponse: false,
            error: true,
            errorMsg: payload.response && payload.response.data ? payload.response.data : 'Server Error. Try Again...'
          }
        }
      case GET_ONE_PURCHASE_DETAILS:
        return {
          ...state,
          onePurchase: {
            details: payload,
            loading: false,
            error: false
          }
        }
      case ERROR_ONE_PURCHASE_DETAILS:
        return {
          ...state,
          onePurchase: {
            ...state.onePurchase,
            loading: false,
            error: true
          }
        }
      case RESET_ONE_PURCHASE_DETAILS:
        return {
          ...state,
          onePurchase: {
            details: {},
            loading: true,
            error: false
          }
        }
      default:
        return state;
    }
  }
  
  export default purchaseReducer;