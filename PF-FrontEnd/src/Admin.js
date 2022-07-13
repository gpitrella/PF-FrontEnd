import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from "./pages/home/Home";
import CreateProductPage from './pages/CreateProductPage/CreateProductPage'
import EditProductPage from './pages/EditProductPage/EditProductPage';
// import CreateActivity from './components/Categories/NewCategory';
import List from './pages/list/List';
import UserEdit from './pages/user/UserEdit'
import ListProducts from './pages/listproduct/Listproduct';
import notFoundPage from './components/404/NotFoundPage404';
import CategPage from './components/CategTable/CategPage/CategPage';
import BrandsPage from './components/BrandsTable/BrandsPage/BrandsPage';
import ListPurchases from './pages/listpurchases/ListPurchases';
import PurchaseDetailsPage from './pages/PurchaseDetailsPage/PurchaseDetailsPage';
import Notifications from './components/Notifications/NotificationPage/NotifiPage';

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
          <Route path = {`${url}/products/edit/:id`} component = {EditProductPage}/>
          <Route path = {`${url}/purchases/list`} component = {ListPurchases}/>
          <Route path = {`${url}/purchases/details/:id`} component = {PurchaseDetailsPage}/>
          <Route path = {`${url}/notifications`} component = {Notifications}/>
          <Route path = '*' component = {notFoundPage} />
        </Switch>    
      </div>
    </>
    );
}

export default Admin;