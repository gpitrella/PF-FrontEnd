import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import { getBrands } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import CreateActivity from './components/Categories/NewCategory';

function App() {

  const dispatch = useDispatch()

  React.useEffect(()=>{
    dispatch(getBrands())
  },[dispatch])

  const { theme } = useSelector(state => state.general);

  return (
    <React.Fragment>
      <Router>
        <div className= {`globalVariables mainContainer ${theme}`}>
          <Route path="/" component={NavBar} />
          <Route exact path="/" component={Home} />
          <Route exact path="/store" component = {Store} />
          <Route exact path="/productDetails" component={ProductDetails} />
          <Route exact path="/productdetails/:id" component={ProductDetails} />
          <Route exact path="/categories" component={CreateActivity} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
