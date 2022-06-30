import { GET_USERS, USER_BANNED, USER_UPDATE } from "../actions/actiontype";

const initialState = {
    allusers: [],
    oneuser: {},
    oneaddress: {},
    userisactive: null,
}

const userReducer = function(state = initialState, { type, payload }) {
    switch(type) {
        
      case GET_USERS:
        return {
          ...state,
          allusers: payload
        }

      case USER_UPDATE:
        return {
          ...state,
          oneuser: {...state, payload}
        }
        
      case USER_BANNED:
        return {
          ...state,
          oneuser: {...state, isactive: payload}
        }

  
      default:
        return state;
    }
  }
  
  export default userReducer;