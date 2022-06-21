import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductCard from './components/ProductCard/ProductCard';
<<<<<<< HEAD
import Home from './components/Home/Home';
=======
import Footer from './components/Footer/Footer';
>>>>>>> a56af53a983ce3bf304ee15d5ecc59a80b90d164
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
<<<<<<< HEAD
        <Route path="/home" component={Home} />
=======
       <Route path="/" component={Brands} />
        <Route path="/" component={Footer} />
>>>>>>> a56af53a983ce3bf304ee15d5ecc59a80b90d164
      </Router>
    </React.Fragment>
  );
}

export default App;
