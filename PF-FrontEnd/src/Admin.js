import Home from "./pages/home/Home";
import "./style/dark.scss";
import React from "react";
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