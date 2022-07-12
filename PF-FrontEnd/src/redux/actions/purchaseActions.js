import {
  BASE_URL,
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
} from './actiontype';

import axios from 'axios';
const PATH_PURCHASE = `${BASE_URL}/api/orders/`;

export let resetPurchases = function() {
  return {
    type: RESET_PURCHASES
  }
}

export let setOriginalPurchases = function() {
  return function (dispatch) {
    return fetch(`${PATH_PURCHASE}`)
           .then(response => response.json())
           .then(data => dispatch({ type: SET_ORIGINAL_PURCHASES, payload: data }))
           .catch(error => console.log(error));
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
  return function (dispatch) {
    return new Promise((resolve) => setTimeout(resolve, 1500))
              .then(response => dispatch({ type: GET_PURCHASES_WITH_FILTER_AND_PAGINATE, payload: filter }));
  }
}

export const putPurchase = function(id, newStatus) {
  return function(dispatch) {
    return axios.put(`${PATH_PURCHASE}`, {
      id: id,
      status: newStatus
    })
           .then(data => dispatch({ type: PUT_PURCHASE }))
           .catch(error => dispatch({ type: ERROR_PUT_PURCHASE, payload: error }));
  }
}

export const waitingResponsePutPurchase = function(status = false) {
  return {
    type: WAITING_RESPONSE_PUT_PURCHASE,
    payload: status
  }
}

export const getOnePurchaseDetails = function(id) {
  return function (dispatch) {
    return fetch(`${PATH_PURCHASE}details/${id}`)
             .then(response => response.json())
             .then(data => { 
                if (data.error) dispatch({ type: ERROR_ONE_PURCHASE_DETAILS });
                else dispatch({ type: GET_ONE_PURCHASE_DETAILS, payload: data }); 
              })
             .catch(error => dispatch({ type: ERROR_ONE_PURCHASE_DETAILS }))
  }
}

export const resetOnePurchaseDetails = function() {
  return {
    type: RESET_ONE_PURCHASE_DETAILS
  }
}