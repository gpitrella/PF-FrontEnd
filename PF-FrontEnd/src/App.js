import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductCard from './components/ProductCard/ProductCard';
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
        <ProductCard 
          id = {1}
          name = {'example'}
          category = {'Prebuild Computer'}
          price = {50000}
          discount = {50}
          description = {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mattis.'}
          rating = {9.5}
       />
        <Route path="/" component={Categories} />
       <Route path="/" component={Brands} />
        <Route path="/" component={Footer} />
      </Router>
    </React.Fragment>
  );
}

export default App;
