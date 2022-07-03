import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from "./pages/home/Home";
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
import EditProduct from './components/EditProduct/EditProduct';
// import CreateActivity from './components/Categories/NewCategory';
import List from './pages/list/List';
import UserEdit from './pages/user/UserEdit'
import ListProducts from './pages/listproduct/Listproduct';
import notFoundPage from './components/404/NotFoundPage404';
import CategPage from './components/CategTable/CategPage/CategPage';
import BrandsPage from './components/BrandsTable/BrandsPage/BrandsPage';

import "./style/dark.scss";

const Admin = () => {

  const { url } = useRouteMatch()
  const { theme } = useSelector(state => state.general);

  return (
    <>
      <div className = {`app ${theme === 'darkTheme' ? 'dark' : ''}`} >
        <Switch>
          <Route path = {`${url}/dashboard`} component = {Home} />
          <Route path = {`${url}/categories`} component = {CategPage}/>
          <Route path = {`${url}/brands`} component = {BrandsPage}/>
          <Route path = {`${url}/users/list`} component = {List}/>
          <Route path = {`${url}/user/edit/:id`} component = {UserEdit}/>
          <Route path = {`${url}/products/list`} component = {ListProducts}/>
          <Route path = {`${url}/products/create`} component = {CreateProductPage}/>
          <Route path = {`${url}/products/edit/:id`} component = {EditProduct}/>
          <Route path = '*' component = {notFoundPage} />
        </Switch>    
      </div>
    </>
    );
}

export default Admin;