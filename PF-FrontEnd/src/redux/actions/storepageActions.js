import {
  UPDATE_FILTER,
  RESET_FILTER
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