import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import FilterPanel from './components/FilterPanel/FilterPanel';
import OrderPanel from './components/OrderPanel/OrderPanel';
import './App.css';
import Home from './components/Home/Home';
import { getBrands } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';

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
          <FilterPanel />
          <OrderPanel />
          <Route exact path="/productdetails/:id" component={ProductDetails} />
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
