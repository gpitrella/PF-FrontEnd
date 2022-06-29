import { ActionTypes } from '@mui/base';
import {
    PRODUCTS_TO_FORMS,
    CREATE_CATEGORY, 
    CREATE_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    UPDATE_CATEGORY,
    DELETE_CATEGORY
} from '../actions/actiontype';

const initialState = {
    allProducts: []
};

const dashboardReducer = function(state = initialState, { type, payload }) {
    switch(type) {
        case PRODUCTS_TO_FORMS:
            return {
                ...state,
                allProducts: payload
            }

        case CREATE_CATEGORY:
            return {
                ...state,
                payload
            }
        case UPDATE_CATEGORY:
            return {
                ...state,
                payload
            }
        case DELETE_CATEGORY:
            return {
                ...state,
                allCategories: payload
            }
        case CREATE_BRAND:
            return {
                ...state,
                payload
            }
        case UPDATE_BRAND:
            return {
                ...state,
                payload
            }
        case DELETE_BRAND:
            return {
                ...state,
                brandsList: payload
            }
    }
}

export default dashboardReducer;