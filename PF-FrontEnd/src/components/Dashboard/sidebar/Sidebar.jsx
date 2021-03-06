import React from "react";
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Badge from '@mui/material/Badge';
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from '@mui/icons-material/Category';
import CopyrightIcon from '@mui/icons-material/Copyright';
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MailIcon from '@mui/icons-material/Mail';
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";
import { changeTheme } from '../../../redux/actions';

const Sidebar = () => {
  //const { dispatch } = useContext(DarkModeContext);
  const { allComments } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [ notification, setNotification ] = React.useState(0);

  React.useEffect(() => {
    // Notification
    if(allComments?.length > 0){
      let resetNotification = 0;
      allComments.map((comment)=>{
        if(comment.answer === null){
          resetNotification += 1
        }
      })
    setNotification(resetNotification);
    }
  },[allComments]);
  
  return (
    <div className="sidebar">
      <div className="top">
        
          <span className="logo">TechMarket <i className = "adminLogo">ADMIN</i></span>
        
      </div>
      <hr />
      <div className="center">
        <ul className="centerlist">
          <p className="title">MAIN</p>
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <HomeIcon className="icon" />
            <span>Home</span>
          </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/users/list" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/products/list" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/purchases/list" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
          <Link to="/admin/categories" style={{ textDecoration: "none" }}>
            <li>
              <CategoryIcon className="icon" />
              <span>Categories</span>
            </li>
          </Link>
          <Link to="/admin/brands" style={{ textDecoration: "none" }}>
            <li>
              <CopyrightIcon className="icon" />
              <span>Manufacturers</span>
            </li>
          </Link>
          <br/>
          <p className="title">USEFUL</p>
          
          <Link to="/admin/notifications" style={{ textDecoration: "none" }}>
            <li>
              <Badge badgeContent={notification} color="error" style={{ marginLeft: "0px" }}>
                <MailIcon className="icon" />
              </Badge>
              <span>Notifications</span>
            </li>
          </Link>
         
          <p className="title">USER</p>
          <Link to="/myprofile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Exit</span>
          </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
