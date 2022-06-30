import axios from 'axios';
import {
  GET_USERS,
  USER_UPDATE,
  USER_DELETE,
  USER_BANNED,
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
// Create comments product
// export const postCommentProduct = function(comment, id) {
//   return function(dispatch){
//     return axios.post(`http://localhost:3001/api/comments`, {comment, id})
//                 .then(comment => dispatch({ type: POST_COMMENT_PRODUCT, payload: comment.data}))
//                 .catch(error => console.log(error))
// }
// }