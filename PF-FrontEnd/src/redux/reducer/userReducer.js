import { GET_USERS, GET_USER_DETAIL, PUT_USER_STATUS, USER_STATUS, USER_STATUS_RESET, USER_UPDATE } from "../actions/actiontype";

const initialState = {
    allusers: [],
    oneuser: {},
    oneaddress: {},
    userisactive: null,
    usereditstatusok: false,
}

const userReducer = function(state = initialState, { type, payload }) {
    switch(type) {
        
      case GET_USERS:
        return {
          ...state,
          allusers: payload
        }
      case GET_USER_DETAIL:
        return {
          oneuser: {payload}
        }  

      case USER_UPDATE:
        return {
          ...state,
          oneuser: {...state, payload}
        }
        
      case USER_STATUS:
        return {
          ...state,
          oneuser: {...state, isactive: payload}
        }
      
      case PUT_USER_STATUS:
        return {
          ...state,
          usereditstatusok: true  
        }  

      case USER_STATUS_RESET:
        return {
          ...state,
          usereditstatusok: false
        }  
  
      default:
        return state;
    }
  }
  
  export default userReducer;