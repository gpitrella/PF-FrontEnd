import React from 'react'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Dashboard/navbar/Navbar";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";

const Edit = ({match}) => {
    const matchId=match.params.id;
    console.log(matchId)
  
    const { allusers } = useSelector((state) => state.userReducer);
    // useEffect(() => {
    //   dispatch(getUserDetail(matchId))
    // },[dispatch, matchId]);
    console.log(allusers, 'allusers')
    const user = allusers.find((element) => element.id !== matchId);
    const useraddress = user.useraddresses
    console.log(useraddress, 'useraddress')  
    
    
    console.log(user, 'filtered')
  
    const { id, name, email, admin, isactive,  } = user
    const { photo, phone_number, street, street_height, city, zipcode } = useraddress[0];
    console.log(phone_number)
  return (
    
    <div className="list">
    <Sidebar/>
        <div className="listContainer">
          <Navbar/>
              <div className="containeruser">
                  <div className="userinfo">
                     <h1>User</h1>
                     <div>
                        <span>{name}</span>
                     </div>
                     <div>
                        <span>{email}</span>
                     </div>
                     <div>
                        <span>{phone_number}</span>
                     </div>
                     <div>
                    <span>{street}</span>
                     </div>
                     <div>
                        <span>{street_height}</span>
                     </div>
                     <div>
                        <span>{city}</span>
                     </div>
                     <div>
                        <span>{zipcode}</span>
                     </div>
                  </div>
                  <div className="useredit">
                      <h1>Status</h1>
                      <div>
                        {isactive ? 'Active' : 'Baned'}
                      </div>
                      <h1>Edit Status</h1>
                      <div>
                      <select name="isactive">
                        <option value="true">ACTIVE</option>
                        <option value="false">BANED</option>
                      </select>
                      </div>

                  </div>
                  
              </div>  
        </div>
    </div>
  )
}

export default Edit