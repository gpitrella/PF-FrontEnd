import {
  RESET_PURCHASES,
  SET_ORIGINAL_PURCHASES,
  UPDATE_FILTER_PURCHASES,
  SET_SHOW_LOADING_PURCHASES,
  GET_PURCHASES_WITH_FILTER_AND_PAGINATE
} from './actiontype';

export let resetPurchases = function() {
  return {
    type: RESET_PURCHASES
  }
}

export let setOriginalPurchases = function() {
  return {
    type: SET_ORIGINAL_PURCHASES
  }
}

export let updateFilterPurchases = function(filter) {
  return {
    type: UPDATE_FILTER_PURCHASES,
    payload: filter
  }
}

export let setShowLoadingPurchases = function() {
  return {
    type: SET_SHOW_LOADING_PURCHASES
  }
}

// Cambiar a traer del servidor.
export let getPurchasesWithFiltersAndPaginate = function(filter) {
  return {
    type: GET_PURCHASES_WITH_FILTER_AND_PAGINATE,
    payload: filter
  }
}