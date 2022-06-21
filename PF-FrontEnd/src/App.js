import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductCards from './components/ProductCards/ProductCards';
import FilterPanel from './components/FilterPanel/FilterPanel';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import './App.css';
import Brands from './components/Brands/Brands';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App"></div>
        <Route path="/" component={NavBar} />
        <ProductCards />
        <FilterPanel />
        <Route path="/" component={Categories} />
       <Route path="/" component={Brands} />
        <Route path="/" component={Footer} />
      </Router>
    </React.Fragment>
  );
}

export default App;
