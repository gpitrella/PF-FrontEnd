import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import notFoundPage from './components/404/NotFoundPage404';
import { getBrands, loadStorage } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import LogIn from './components/LogIn/LogIn';
import SignUp from './components/SignUp/SignUp';
import AddToCart from './components/AddToCart/AddToCart';
import Admin from './Admin';
import ContacUsForm from './components/ContactUs/ContacUsForm';
import CheckOut from './components/CheckOut/CheckOut';
import { Redirect } from 'react-router-dom';
import FAQs from './components/FAQs/FAQs';
import Adresses from './components/Branches/Adresses';
import MyProfile from './components/MyProfile/MyProfile';
import SuccessBuy from './components/SuccessBuy/SuccessBuy';
import UserProfile from './UserProfile'
import Landing from './components/Landing/Landing';
import PersonalInformation from './components/MyProfile/PersonalInformation/PersonalInformation';

import PageLoader from './components/PageLoader/PageLoader';

function App() {
  const dispatch = useDispatch()

  const { user, showPageLoader } = useSelector((state) => state.general);

  React.useEffect(() => {
    dispatch(loadStorage());
  }, []);

  React.useEffect(()=>{
    dispatch(getBrands())
  },[dispatch])

  const { theme, showCart } = useSelector(state => state.general);

  if (showPageLoader) return (
    <React.Fragment>
      <div className= {`globalVariables mainContainer ${theme}`}>
        <PageLoader />
      </div>
    </React.Fragment>
  );
  
  return (
    <React.Fragment>
      <Router>
      <Landing />
        <div className= {`globalVariables mainContainer ${theme}`}>
          <Route path="/" component={NavBar} />
          <AddToCart showCart={showCart}/> 
            <Switch>
                        
              <Route exact path="/" component={Home} />
              <Route exact path="/landing" component={Landing} />
              <Route exact path="/store/" component = {Store} />
              <Route exact path="/login"> { !user || !user.user ? <LogIn/> : <Redirect to="/"/>}</Route>
              <Route exact path="/signup"> { !user || !user.user ? <SignUp/> : <Redirect to="/"/>}</Route>
              <Route exact path="/store/discount/:discount" component = {Store} />
              <Route exact path="/store/name/:name" component = {Store} />
              <Route exact path="/store/category/:category" component = {Store} />
              <Route exact path="/store/brand/:brand" component = {Store} />
              <Route exact path="/productdetails/:id" component={ProductDetails} />
              <Route exact path='/checkout' component = {CheckOut} />              
              <Route path = "/admin"> {user?.user?.admin ? <Admin/> : <Redirect to = "/"/>}</Route>
              <Route path='/myprofile'> {user?.user ? <UserProfile/> : <Redirect to="/login"/>}</Route>
              <Route exact path='/contactus' component={ContacUsForm} />
              <Route exact path='/faqs' component={FAQs} />
              <Route exact path='/branches' component={Adresses} />
              <Route exact path='/successbuy' component={SuccessBuy} />
              
              <Route exact path='*' component={notFoundPage} />
            </Switch>
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;