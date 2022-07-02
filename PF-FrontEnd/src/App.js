import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
// import CreateProduct from './components/CreateProduct/CreateProduct'
import notFoundPage from './components/404/NotFoundPage404';
import { getBrands, loadStorage } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';
// import CreateActivity from './components/Categories/NewCategory';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import AddToCart from './components/AddToCart/AddToCart';
import Admin from './Admin';
// import List from './pages/list/List';
// import UserEdit from './pages/user/UserEdit'
// import ListProducts from './pages/listproduct/Listproduct';
import ContacUsForm from './components/ContactUs/ContacUsForm';
import CheckOut from './components/CheckOut/CheckOut';
import { Redirect } from 'react-router-dom';
import FAQs from './components/FAQs/FAQs';
import Adresses from './components/Branches/Adresses';

function App() {
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.general)

  React.useEffect(() => {
    dispatch(loadStorage());
  }, []);

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
              <Route exact path="/login"> {user ? <LogIn/> : <Redirect to="/"/>}</Route>
              <Route exact path="/signup"> {user ? <SignUp/> : <Redirect to="/"/>}</Route>
              <Route exact path="/store/discount/:discount" component = {Store} />
              <Route exact path="/store/name/:name" component = {Store} />
              <Route exact path="/store/category/:category" component = {Store} />
              <Route exact path="/store/brand/:brand" component = {Store} />
              <Route exact path="/productdetails/:id" component={ProductDetails} />
              <Route exact path='/checkout'> {user?.user ? <CheckOut/> : <Redirect to="/login"/>}</Route>
              {/*<Route exact path="/createproduct"> {user?.user?.admin ? <CreateProduct/> : <Redirect to="/"/>}</Route>
              <Route exact path="/admin/categories"> {user?.user?.admin ? <CreateActivity/> : <Redirect to="/"/>}</Route>*/}
              
              <Route path = "/admin"> {user?.user?.admin ? <Admin/> : <Redirect to = "/"/>}</Route>
{/*              <Route exact path="/admin/users/list"> {user?.user?.admin ? <List/> : <Redirect to="/"/>}</Route>
              <Route exact path="/admin/user/edit/:id" component={UserEdit}/>
              <Route exact path ="/admin/products/list"> {user?.user?.admin ? <ListProducts/> : <Redirect to="/"/>}</Route>
              <Route exact path="/admin/products/createproduct"> {user?.user?.admin ? <CreateProduct/> : <Redirect to="/"/>}</Route>
              <Route exact path="/admin/categories"> {user?.user?.admin ? <CreateActivity/> : <Redirect to="/"/>}</Route>*/}

              <Route exact path='/contactus' component={ContacUsForm} />
              <Route exact path='/faqs' component={FAQs} />
              <Route exact path='/branches' component={Adresses} />
            
              <Route exact path='*' component={notFoundPage} />
            </Switch>
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
