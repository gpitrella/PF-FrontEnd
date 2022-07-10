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
  USER_REVIEWS,
  GET_COMMENTS_BY_USER,
  DELETE_USER_ADDRESS,
  USER_ADD_ADDRESS
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


// Get comments or question By User
export const getAllCommentByUserID = function(idUser) {
  return function(dispatch){
    console.log(idUser)
    return axios.get(`${BASE_URL}/api/comments`)
                .then(comment => dispatch({ type: GET_COMMENTS_BY_USER, payload: comment.data.filter(data => data.users[0].id === idUser )}))
                .catch(error => console.log(error))
  }
};

// Delete User Address
export function deleteUserAddress(id) {
  return function(dispatch){
    console.log(id)
    return axios.delete(`${BASE_URL}/api/address/${id}`)
                .then(data => console.log(data))
                .catch(error => console.log(error))
  }
};

// Agregar Direccion
export const userUpdate = function(newUserInfo) {
  return {
    type: USER_UPDATE,
    payload: newUserInfo
  }
}

// Agregar Direccion
export const userAddAddress = function(userId, { direction, latitude, longitude }) {
  return function(dispatch) {
    return axios.post(`${BASE_URL}/api/address/${userId}`, { direction, latitude, longitude })
                .then(data => dispatch({ type: USER_ADD_ADDRESS }))
                .catch(error => console.log(error));
  }
}