import React from 'react';
import Google from "./google.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, openPageLoader } from "../../redux/actions";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { BASE_URL  } from '../../redux/actions/actiontype';
import './LogIn.css'
import { validateEmail, validatePassword } from "./validate";
import { Snackbar, Alert } from '@mui/material';

import s from './Login.module.css';

const LogIn = () => {
  const [redirect, setRedirect] = useState({ value: false })
  // const [checkMailPassword, setCheckMailPassword] = useState(false)

  const { user, logInError } = useSelector((state) => state.general)
  const [errorsEmail, setErrorsEmail] = useState({})
  const [errorsPassword, setErrorsPassword] = useState({})
  const [openPassword, setOpenPassword] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openBanned, setOpenBanned] = useState(false);
  

  const google = () => {
    window.open(`${BASE_URL}/auth/google`, "_self");
  };

  const handleClosePassword = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenPassword(false);
  };

  const handleCloseEmail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenEmail(false);
  };

  const handleCloseBanned = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenBanned(false);
  };

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
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(input.email, input.password))
    setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
    setErrorsPassword(validatePassword({...input,[e.target.name]: e.target.value}))
  }

  React.useEffect(() => {
    // console.log(logInError)
    if(logInError.status === 401){
      setOpenPassword(true)
      errorsPassword.password = "Wrong password"
      document.getElementById('password').classList.add('login__group-incorrecto')
      document.getElementById('password').classList.remove('login__group-correcto')
      document.querySelector('#password .login__input-error').classList.add('login__input-error-activo')
    } else if(logInError.status === 404){
      setOpenEmail(true)
      errorsEmail.email = "Unregistered Email"
      document.getElementById('email').classList.add('login__group-incorrecto')
      document.getElementById('email').classList.remove('login__group-correcto')
      document.querySelector('#email .login__input-error').classList.add('login__input-error-activo')
    } else if(logInError.status === 405){
      setOpenBanned(true)
      document.getElementById('email').classList.add('login__group-incorrecto')
      document.getElementById('email').classList.remove('login__group-correcto')
      document.querySelector('#email .login__input-error').classList.add('login__input-error-activo')
      document.getElementById('password').classList.add('login__group-incorrecto')
      document.getElementById('password').classList.remove('login__group-correcto')
      document.querySelector('#password .login__input-error').classList.add('login__input-error-activo')
    }
  },[logInError]); 

  
  // React.useEffect(() => {
  //   if (redirect && redirect.value) dispatch(openPageLoader());
  // }, [redirect]);

  return (

    <div className="login">
      <div className = {`login__wrapper ${s.loginContainer}`}>

        <div className='login__group'>
          <h1 className="login__title">Sign In</h1>
        </div>

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
          <button type='submit' className="login__btn" onClick={(e) => handleSubmit(e)} >Log In</button>
        </div>
        <p className="login__text"><Link to='/sendemail' className="link">Forgot password?</Link></p>
          {/* {checkMailPassword.value ? (<p className='danger'>Something was wrong. Please check email or password.</p>) : null} */}
          
          {redirect?.value ? <Redirect push to={'/'} underline="none" /> : null}

          <div className="login__group">
            <div className="login_lines">
          <div className="or">OR</div>
          </div>
          </div>

          <div className='login__google' >
          {/*<div className="login__btn-google " onClick={google}>
          <img src={Google} alt="" className="icon" />
          Google
          </div>*/}
          </div>
          <p className="login__text">No account yet? <Link to='/signup' className="link">Sign up here!</Link></p>

          <Snackbar autoHideDuration={4000} open={openPassword} onClose={handleClosePassword}>
          <Alert onClose={handleClosePassword} severity="error" sx={{ width: '100%' }}>
              Wrong password
          </Alert>
          </Snackbar>

          <Snackbar autoHideDuration={4000} open={openEmail} onClose={handleCloseEmail}>
          <Alert onClose={handleCloseEmail} severity="error" sx={{ width: '100%' }}>
              Unregistered Email
          </Alert>
          </Snackbar>

          <Snackbar autoHideDuration={4000} open={openBanned} onClose={handleCloseBanned}>
          <Alert onClose={handleCloseEmail} severity="error" sx={{ width: '100%' }}>
              YOU ARE BANNED!!!
          </Alert>
          </Snackbar>

      </div>
    </div>
  );
};

export default LogIn;