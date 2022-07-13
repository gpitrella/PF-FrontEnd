import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import { putUserStatus, userStatus, userStatusReset, putUserAdmin } from '../../redux/actions';
import style from "./Useredit.module.css"
import "./list.scss"

const Edit = ({match}) => {
   const dispatch = useDispatch();
   const history = useHistory();

    const matchId=match.params.id;
          
    const { allusers, usereditstatusok } = useSelector((state) => state.userReducer);
       
    const user = allusers.filter(function(u){
      return u.id == matchId;
    })

    const useraddress = user[0].useraddresses[0] 
    
      const { id, name, email, isactive, admin  } = user[0]
    
      const [ newstatus, setNewstatus ] = useState(isactive ? "true" : "false");
  
      function handleSelect(e){
         
         if(e.target.value === 'true'){
            setNewstatus("true")
         }else {
            setNewstatus("false")
         }
      console.log(newstatus)
      dispatch(userStatus(newstatus))
      }  

      function handleConfirm(){
         dispatch(putUserStatus(id, newstatus))
      }

      function handleConfirmPromote(){
         dispatch(putUserAdmin(id));
      }

      useEffect(()=>{
         if (usereditstatusok){
            dispatch(userStatusReset())
            history.push('/admin/users/list')
         }

      }, [usereditstatusok])

  return (
    <>   
    <div className={`list ${style.list}`}>
      <Sidebar/>
      <div className={`listContainer ${style.listContainer}`}>
         <div className={style.containeruser}>

            <div className = {style.header}>
              <Link to = {'/admin/users/list'}>
                <button className = {style.goBack}>{'< Go Back'}</button>
              </Link>
            </div>

            <div className={style.userinfo}>
               <h2>User Info</h2>
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
               : <div><span>No Address Registed</span></div>
               }   
            </div>
            <div className={style.useredit}>
              <h2>Status</h2>
              <div className = { `${newstatus === 'true' ? style.green : style.red}` }>
                {newstatus === 'true' ? 'ACTIVE' : 'BANNED'}
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
              {
               user && !admin && isactive &&
               <div className={style.inputDiv}>
                  <input 
                     className={`${style.input} ${style.promote}`}
                     type="button"
                     value="Promote to Admin"
                     onClick={handleConfirmPromote}
                  />
              </div>
              }
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