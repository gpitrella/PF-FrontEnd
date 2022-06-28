import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import './App.css';
import Home from './components/Home/Home';
import Store from './components/Store/Store';
import CreateProduct from './components/CreateProduct/CreateProduct'
import notFoundPage from './components/404/NotFoundPage404';
import { getBrands } from './redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import CreateActivity from './components/Categories/NewCategory';
import LogIn from './components/LogIn/LogIn';

function App() {

  const dispatch = useDispatch()

  const [user, setUser] = React.useState(null);

  // const [localUser, setLocalUser] = React.useState(null);

  const users = React.useSelector((state) => state.general.user)

  React.useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/api/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  //? objeto devuelto user para sacar la data
   console.log(user);

  React.useEffect(()=>{
    dispatch(getBrands())
  },[dispatch])

  const { theme } = useSelector(state => state.general);

  return (
    <React.Fragment>
      <Router>
        <div className= {`globalVariables mainContainer ${theme}`}>
          <Route path="/" component={NavBar} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/store/" component = {Store} />
              <Route exact path="/login" component = {LogIn} />
              <Route exact path="/store/discount/:discount" component = {Store} />
              <Route exact path="/store/name/:name" component = {Store} />
              <Route exact path="/store/category/:category" component = {Store} />
              <Route exact path="/store/brand/:brand" component = {Store} />
              <Route exact path="/productdetails/:id" component={ProductDetails} />
              <Route exact path="/createproduct" component={CreateProduct} />
              <Route exact path="/categories" component={CreateActivity} />
              <Route exact path='*' component={notFoundPage} />
            </Switch>
          <Route path="/" component={Footer} />
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
