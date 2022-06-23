import {
  UPDATE_FILTER,
  RESET_FILTER,
  SHOW_LOADING,
  SHOW_ERROR,
  SHOW_STORE,
  CLOSE_STORE
} from './actiontype';

export const updateFilter = function(newFilter) {
  return {
    type: UPDATE_FILTER,
    payload: newFilter
  }
}

export const resetFilter = function() {
  return {
    type: RESET_FILTER
  }
}

export const showLoading = function() {
  return {
    type: SHOW_LOADING
  }
}

export const showStore = function() {
  return {
    type: SHOW_STORE
  }
}

export const closeStore = function() {
  return {
    type: CLOSE_STORE
  }
}