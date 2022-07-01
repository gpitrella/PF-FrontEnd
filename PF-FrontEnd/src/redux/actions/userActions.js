import axios from 'axios';
import {
  GET_USERS,
  GET_USER_DETAIL,
  USER_UPDATE,
  USER_DELETE,
  USER_STATUS,
  
} from './actiontype';

const urluser = 'http://localhost:3001/api/user';

// export const getAllUsers = function() {
//   return {
//     type: GET_USERS
//   }
// }
export function getAllUsers() {
    return async (dispatch) => {
      return await axios
        .get(urluser)
        .then((res) => dispatch({ type: "GET_USERS", payload: res.data }));
    };
  }

export function getUserDetail(id) {
  console.log(id,'actions')
   return async (dispatch) => {
     return await axios
       .get(`http://localhost:3001/api/user/${id}`)
       .then((res) => dispatch({ type: "GET_USER_DETAIL", payload: res.data }))
       .catch(error => console.log(error))
    };
}  

export function userStatus(status) {
  return function (dispatch) {
    dispatch ({ type: 'USER_STATUS', payload: status})
  }
}