import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Listproduct from "./pages/listproduct/Listproduct";
import Single from "./pages/single/Single";
// import New from "./pages/new/New";
import { Link } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import React, { useContext } from "react";
//import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from 'react-redux';


const Admin = () => {

  //const { darkMode } = useContext(DarkModeContext);

  const { theme } = useSelector(state => state.general);

  return (
    <>
      <div className = {`app ${theme === 'darkTheme' ? 'dark' : ''}`} >
        <Home />    
      </div>
    </>
    );
}

export default Admin;