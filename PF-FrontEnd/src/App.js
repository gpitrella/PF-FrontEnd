import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import './App.css';
import Home from './components/Home/Home';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="App"></div>
        <Route path="/" component={NavBar} />
        <Route path="/" component={Home} />
        <Route path="/" component={Footer} />
      </Router>
    </React.Fragment>
  );
}

export default App;
