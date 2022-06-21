import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import ProductCards from './components/ProductCards/ProductCards';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App"></div>
        <Route path="/" component={NavBar} />
        <ProductCards />
      </Router>
    </React.Fragment>
  );
}

export default App;
