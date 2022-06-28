import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Listproduct from "./pages/listproduct/Listproduct";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Link } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import React, { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";


const Admin = () => {

  const { darkMode } = useContext(DarkModeContext);

  return (
    <>
      <div className={darkMode ? "app dark" : "app"}>
            <Link to="/">
              <Home />
            </Link>
      </div>
    </>
    );
}

export default Admin;