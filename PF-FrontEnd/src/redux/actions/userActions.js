import axios from 'axios';
import {
  GET_USERS,
  GET_USER_DETAIL,
  USER_UPDATE,
  DELETE_USER_DETAIL,
  USER_STATUS,
  PUT_USER_STATUS,
  USER_STATUS_RESET,
  BASE_URL,
  USER_REVIEWS
} from './actiontype';

const urluser = `${BASE_URL}/api/user`;

// export const getAllUsers = function() {
//   return {
//     type: GET_USERS
//   }
// }
export function getAllUsers() {
  return async (dispatch) => {
    return await axios
      .get(urluser)
      .then((res) => dispatch({ type: GET_USERS, payload: res.data }));
  };
};

export function getUserDetail(id) {
  console.log(id,'actions')
   return async (dispatch) => {
     return await axios
       .get(`${BASE_URL}/api/user/${id}`)
       .then((res) => dispatch({ type: GET_USER_DETAIL, payload: res.data }))
       .catch(error => console.log(error))
    };
};

export function putUserStatus(id, newstatus){
  return (dispatch => {
    return axios.put(`${BASE_URL}/api/user/${id}?isactive=${newstatus}`)
           .then(res => dispatch({ type: PUT_USER_STATUS})) 
           .catch(err => console.log(err.response.data))
  })
};

export function userStatusReset(){
  return { type: USER_STATUS_RESET}
}; 

export function userStatus(status) {
  return function (dispatch) {
    dispatch ({ type: USER_STATUS, payload: status})
  }
};

export function deleteUserDetail(){
  return { type: DELETE_USER_DETAIL }
};

export function getUserReviews(id){
  return function(dispatch){
    return axios.get(`${BASE_URL}/api/ProfileUser/reviews/${id}`)
           .then(res => dispatch({ type: USER_REVIEWS, payload: res.data})) 
           .catch(err => console.log(err))
  }
};