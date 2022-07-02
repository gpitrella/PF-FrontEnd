import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from "./pages/home/Home";
import CreateProduct from './components/CreateProduct/CreateProduct'
import CreateActivity from './components/Categories/NewCategory';
import List from './pages/list/List';
import UserEdit from './pages/user/UserEdit'
import ListProducts from './pages/listproduct/Listproduct';
import notFoundPage from './components/404/NotFoundPage404';

import "./style/dark.scss";

const Admin = () => {

  const { url } = useRouteMatch()
  const { theme } = useSelector(state => state.general);

  return (
    <>
      <div className = {`app ${theme === 'darkTheme' ? 'dark' : ''}`} >
        <Switch>
          <Route path = {`${url}/dashboard`} component = {Home} />
          <Route path = {`${url}/categories`} component = {CreateActivity}/>
          <Route path = {`${url}/users/list`} component = {List}/>
          <Route path = {`${url}/user/edit/:id`} component = {UserEdit}/>
          <Route path = {`${url}/products/list`} component = {ListProducts}/>
          <Route path = {`${url}/products/createproduct`} component = {CreateProduct}/>
          <Route path = '*' component = {notFoundPage} />
        </Switch>    
      </div>
    </>
    );
}

export default Admin;