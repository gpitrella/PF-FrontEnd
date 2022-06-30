import Google from "./google.png";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import './LogIn.css'
import { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {

  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self");
  };

    const [ input, setInput ] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    

  const dispatch = useDispatch();

  const handleLogIn = (e) => {
    e.preventDefault();
    dispatch(logIn(input.email, input.password))
  }

  return (

    <div className="login">
      <h1 className="loginTitle">Log In</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
          <img src={Google} alt="" className="icon" />
          Google
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">

          <input
          type="email"
          name={"email"}
          value={input.email}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          />

          <input
          type="password"
          name={"password"}
          value={input.password}
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          />
          
          <button type='submit' className="submit" onClick={(e) => handleLogIn(e)} >Log In</button>
          <p className="text">No account yet? <Link to='/signup' className="link">Sign up here!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;