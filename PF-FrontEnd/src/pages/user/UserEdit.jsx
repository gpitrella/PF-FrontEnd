import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../../components/Dashboard/navbar/Navbar";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import { getUserDetail, userStatus } from '../../redux/actions';
import style from './Useredit.module.css'
const Edit = ({match}) => {
   const dispatch = useDispatch();
   const history = useHistory();

    const matchId=match.params.id;
    console.log(matchId, 'matchId')
  
    
   //  useEffect(() => {
   //    dispatch(getUserDetail(matchId))
   //  },[dispatch, matchId]);
    
    const { allusers } = useSelector((state) => state.userReducer);
    
    console.log(allusers, 'allusers')
    
    const user = allusers.filter(function(u){
      return u.id == matchId;
    })
    console.log(user, 'user')
    const useraddress = user[0].useraddresses[0]
    console.log(useraddress, 'useraddress')  
    
    
  
      const { id, name, email, admin, isactive,  } = user[0]
    
      const [ newstatus, setNewstatus ] = useState(isactive ? "true" : "false");
      //const { photo, phone_number, street, street_height, city, zipcode } = useraddress;
         
      
  
      console.log(newstatus)
  
      function handleSelect(e){
         console.log(e.target.value)
         if(e.target.value === 'true'){
            setNewstatus("true")
         }else {
            setNewstatus("false")
         }
      console.log(newstatus)
      dispatch(userStatus(newstatus))
      }  
      async function handleConfirm(){
         await axios.put(`http://localhost:3001/api/user/${id}?isactive=${newstatus}`)
         .then(res => history.push("/admin/users/list")) 
         .catch(err => console.log(err.response.data))
      }
  return (
    <>   
    <div className={style.list}>
    <Sidebar/>
        <div className={style.listContainer}>
          
              <div className={style.containeruser}>
                  <div className={style.userinfo}>
                     <h2>User</h2>
                     <div>
                        <span>{name}</span>
                     </div>
                     <div>
                        <span>{email}</span>
                     </div>
                     { useraddress ?
                     <>   
                     <div>
                        <span>{useraddress.phone_number}</span>
                     </div>
                     <div>
                    <span>{useraddress.street}</span>
                     </div>
                     <div>
                        <span>{useraddress.street_height}</span>
                     </div>
                     <div>
                        <span>{useraddress.city}</span>
                     </div>
                     <div>
                        <span>{useraddress.zipcode}</span>
                     </div>
                     </>
                     : console.log('no direccion')
                     }   
                  </div>
                  <div className={style.useredit}>
                      <h2>Status</h2>
                      <div>
                        {newstatus === 'true' ? 'ACTIVE' : 'BANED'}
                      </div>
                      <h3>Edit Status</h3>
                      <div className={style.selectDiv}>
                      <select name="isactive"
                      onChange={(e) => handleSelect(e)}
                      value={newstatus}>
                        <option value={"true"}>ACTIVE</option>
                        <option value={"false"}>BANED</option>
                      </select>
                      </div>
                      <div className={style.inputDiv}>
                        <input className={style.input} type="button" value="Confirm" onClick={handleConfirm}/>
                      </div>

                  </div>
                  
              </div>  
        </div>
    </div>
    </>
  )
}

export default Edit