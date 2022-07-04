import React from 'react';
import Google from "./google.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, openPageLoader } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { BASE_URL  } from '../../redux/actions/actiontype';
import './LogIn.css'
import { validateEmail, validatePassword } from "./validate";

import s from './Login.module.css';

const LogIn = () => {
  const [redirect, setRedirect] = useState({ value: false })
  // const [checkMailPassword, setCheckMailPassword] = useState(false)

  const { user } = useSelector((state) => state.general)
  const google = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  const [errorsEmail, setErrorsEmail] = useState({})
  const [errorsPassword, setErrorsPassword] = useState({})

  const [ input, setInput ] = useState({
      email: '',
      password: ''
  })

    const handleChange = (e) => {
        e.preventDefault();
        setInput({...input,[e.target.name]: e.target.value})
        setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
        setErrorsPassword(validatePassword({...input,[e.target.name]: e.target.value}))
    }
    

  const dispatch = useDispatch();
  

  const handleLogIn = (e) => {
    e.preventDefault();
    dispatch(logIn(input.email, input.password))
    setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
    setErrorsPassword(validatePassword({...input,[e.target.name]: e.target.value}))
  }

  // React.useEffect(() => {
  //   if(user?.user && input.email !== '' && input.password !== '' ){
  //     setRedirect({value: true});
  //   } 
  // },[user]);

  // React.useEffect(() => {
  //   if (redirect && redirect.value) dispatch(openPageLoader());
  // }, [redirect]);

  return (

    <div className="login">
      <div className = {`login__wrapper ${s.loginContainer}`}>
        
          <h1 className="login__title">Log In</h1>

        <div className='login__group' id='email'>
            <input
            type="email"
            id="email"
            name={"email"}
            value={input.email}
            placeholder="Email"
            onChange={(e) => handleChange(e)}
            className = {`login__input ${s.input}`}
            />
            <p className = {`login__input-error ${s.errorMsg}`}>{errorsEmail.email}</p>
        </div>

        <div className='login__group' id='password'>
            <input
            type="password"
            id='password'
            name={"password"}
            value={input.password}
            placeholder="Password"
            onChange={(e) => handleChange(e)}
            className = {`login__input ${s.input}`}
            />
            <p className = {`login__input-error ${s.errorMsg}`}>{errorsPassword.password}</p>
        </div>
        <div className='login__group' >
          <button type='submit' className="login__btn" onClick={(e) => handleLogIn(e)} >Log In</button>
          </div>
          {/* {checkMailPassword.value ? (<p className='danger'>Something was wrong. Please check email or password.</p>) : null} */}
          
          
          {redirect?.value ? <Redirect push to={'/'} underline="none" /> : null}

          <div className="login__group">
            <div className="login_lines">
          <div className="or">OR</div>
          </div>
          </div>

          <div className='login__google' >
          <div className="login__btn-google " onClick={google}>
          <img src={Google} alt="" className="icon" />
          Google
          </div>
          </div>
          <p className="login__text">No account yet? <Link to='/signup' className="link">Sign up here!</Link></p>
        
      </div>
    </div>
  );
};

export default LogIn;