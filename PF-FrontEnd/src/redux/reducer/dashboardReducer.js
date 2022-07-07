import {
    CATEGORIES_TO_DASHBOARD,
    CREATE_CATEGORY, 
    CREATE_BRAND,
    UPDATE_BRAND,
    DELETE_BRAND,
    UPDATE_CATEGORY,
    DELETE_CATEGORY
} from '../actions/actiontype';

const initialState = {
    categoriesToDashboard: [],
};

const dashboardReducer = function(state = initialState, { type, payload }) {
    switch(type) {
        case CATEGORIES_TO_DASHBOARD:
            return {
                ...state,
                categoriesToDashboard: payload
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
                payload
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
                payload
            }
        //DEFAULT CASE:
        default:
            return {
                ...state,
            }
    }
}

export default dashboardReducer;