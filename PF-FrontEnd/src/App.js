import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import FilterPanel from './components/FilterPanel/FilterPanel';
import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App"></div>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Home} />
        <FilterPanel />
        <Route exact path="/productDetails" component={ProductDetails} />
        <Route path="/" component={Footer} />
      </Router>
    </React.Fragment>
  );
}

export default App;
