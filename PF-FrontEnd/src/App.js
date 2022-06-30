import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import CreateProduct from './components/CreateProduct/CreateProduct'
import notFoundPage from './components/404/NotFoundPage404';
import ModalAddAddress from './components/ModalAddAddress/ModalAddAddress';
import { getBrands } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import CreateActivity from './components/Categories/NewCategory';
import AddToCart from './components/AddToCart/AddToCart';
import Admin from './Admin';
import List from './pages/list/List';
import ListProducts from './pages/listproduct/Listproduct';
import ContacUsForm from './components/ContactUs/ContacUsForm';
import CheckOut from './components/CheckOut/CheckOut';

function App() {

  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(getBrands())
  },[dispatch])

  const { theme, showCart } = useSelector(state => state.general);  

  return (
    <React.Fragment>
      <Router>
        <div className= {`globalVariables mainContainer ${theme}`}>
          <Route path="/" component={NavBar} />
          <AddToCart showCart={showCart}/> 
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/store/" component = {Store} />
              <Route exact path="/store/discount/:discount" component = {Store} />
              <Route exact path="/store/name/:name" component = {Store} />
              <Route exact path="/store/category/:category" component = {Store} />
              <Route exact path="/store/brand/:brand" component = {Store} />
              <Route exact path="/productdetails/:id" component={ProductDetails} />
              <Route exact path="/createproduct" component={CreateProduct} />
              <Route exact path="/categories" component={CreateActivity} />
              <Route exact path="/admin/dashboard" component={Admin} />
              <Route exact path="/users/list" component={List} />
              <Route exact path = '/admin/products' component={ListProducts} />
              <Route exact path="/test" component={ModalAddAddress} />
              <Route exact path='/contactus' component={ContacUsForm} />
              <Route exact path='/checkout' component={CheckOut} />
              <Route exact path='*' component={notFoundPage} />
            </Switch>
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
