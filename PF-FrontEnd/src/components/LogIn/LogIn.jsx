import React from 'react';
import Google from "./google.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import './LogIn.css'

const LogIn = () => {
  const [redirect, setRedirect] = useState({ value: false })
  // const [checkMailPassword, setCheckMailPassword] = useState(false)

  const { user } = useSelector((state) => state.general)
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

  React.useEffect(() => {
    if(user?.user && input.email !== '' && input.password !== '' ){
      setRedirect({value: true})
    } 
  },[user])

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
          {/* {checkMailPassword.value ? (<p className='danger'>Something was wrong. Please check email or password.</p>) : null} */}
          <input
          type="email"
          name={"email"}
          value={input.email}
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          className = "inputLogin"
          />

          <input
          type="password"
          name={"password"}
          value={input.password}
          placeholder="Password"
          onChange={(e) => handleChange(e)}
          className = "inputLogin"
          />
          
          <button type='submit' className="submit" onClick={(e) => handleLogIn(e)} >Log In</button>
          {redirect?.value ? <Redirect push to={'/'} underline="none" /> : null}
          <p className="text">No account yet? <Link to='/signup' className="link">Sign up here!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;