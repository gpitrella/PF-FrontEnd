import { 
  GET_USERS, 
  GET_USER_DETAIL, 
  DELETE_USER_DETAIL, 
  PUT_USER_STATUS, 
  USER_STATUS, 
  USER_STATUS_RESET, 
  USER_UPDATE,
  USER_REVIEWS,
  GET_COMMENTS_BY_USER,
  EDIT_DATA_USER,
  USER_ADD_ADDRESS,
  PUT_PASSWORD,
  CLEAR_UPDATE_USER,
  UPDATE_COMMENT_VIEWED,
  CLEAR_COMMENT_VIEWED
} from "../actions/actiontype";

const initialState = {
    allusers: [],
    oneuser: {},
    oneaddress: {},
    userisactive: null,
    usereditstatusok: false,
    userReviews: [],
    commentByUser: [],
    updateUser: {},
    reloadUserDetails: false,
    updateComment: ''
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
          ...state,
          reloadUserDetails: false,
          oneuser: {
            ...payload,
          }
        }  

      case USER_UPDATE:
        return {
          ...state,
          oneuser: payload
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
      
      case DELETE_USER_DETAIL:
        return {
          ...state,
          oneuser: {}
        }
      
      case USER_REVIEWS:
        return {
          ...state,
          userReviews: payload
        }

      case GET_COMMENTS_BY_USER:
        return {
          ...state,
          commentByUser: payload
        }

      case EDIT_DATA_USER:
        return {
          ...state,
          updateUser: payload
        }
        
      // Agregar direccion a traves del modal.
      case USER_ADD_ADDRESS:
        return {
          ...state,
          reloadUserDetails: true
        }

      case PUT_PASSWORD:
        return {
          ...state,
          updateUser: payload
        }

      case CLEAR_UPDATE_USER:
        return {
          ...state,
          updateUser: {}
        }

      case UPDATE_COMMENT_VIEWED:
        return {
          ...state,
          updateComment: 'Comment Update'
        }
      
      case CLEAR_COMMENT_VIEWED: 
        return {
          ...state,
          updateComment: ''
        }
  
      default:
        return state;
    }
  }
  
  export default userReducer;