import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductCards from './components/ProductCards/ProductCards';
import Categories from './components/Categories/Categories';
import Footer from './components/Footer/Footer';
import './App.css';
import Brands from './components/Brands/Brands';
import DetailProduct from './components/DetailProduct/DetailProduct';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App"></div>
        <Route path="/" component={NavBar} />
        <ProductCards path="/" component={ProductCards} />
        <ProductCards path="/" component={ProductCards} />
        <ProductCards path="/" component={ProductCards} />
        <Route path="/" component={Categories} />
        <Route path="/" component={Brands} />
        <Route path="/" component={Footer} />
        <Route path="/product" exact component={DetailProduct} />
      </Router>
    </React.Fragment>
  );
}

export default App;
