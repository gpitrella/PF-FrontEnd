import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../../components/Dashboard/navbar/Navbar";
import Sidebar from "../../components/Dashboard/sidebar/Sidebar";
import "./user.css";


export default function User({match}) {
  
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
  const { photo, phone_number, street, street_height, city, zipcode } = useraddress
  

  return (
    <div className="list">
    <Sidebar/>
    <div className="listContainer">
      <Navbar/>
          <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/user/newuser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={photo}
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{name}</span>
                  <span className="userShowUserTitle">{email}</span>
                  <span className="userShowInfoTitle">{phone_number}</span>
                  <span className="userShowInfoTitle">{email}</span>
                </div>
              </div>
              <div className="userShowBottom">
                {/* <span className="userShowTitle">Account Details</span> */}
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{phone_number}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{email}</span>
                </div>
                {/* <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">{name}</span>
                </div> */}
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{phone_number}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{street}</span>
                  <span className="userShowInfoTitle">{city}</span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Username</label>
                    <input
                      type="text"
                      placeholder={name}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder={email}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="password"
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input
                      type="text"
                      placeholder={phone_number}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Address</label>
                    <input
                      type="text"
                      placeholder={street}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Street Height</label>
                    <input
                      type="text"
                      placeholder={street_height}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>City</label>
                    <input
                      type="text"
                      placeholder={city}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Zip Code</label>
                    <input
                      type="text"
                      placeholder={zipcode}
                      className="userUpdateInput"
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src={photo}
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div>
                  <button className="userUpdateButton">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>  
    </div>
  </div>


    
  );
}
