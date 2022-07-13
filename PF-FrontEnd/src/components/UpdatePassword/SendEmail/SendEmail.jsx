import React from 'react'
import { useState } from 'react'
import { validateEmail } from '../../LogIn/validate'
import { useSelector, useDispatch } from 'react-redux'
import { sendEmail } from '../../../redux/actions'
import { Snackbar, Alert } from '@mui/material';

import s from './SendEmail.module.css'


export default function SendEmail() {

    const [ input, setInput ] = useState({
        email: '',
    })

    const { logInError } = useSelector((state) => state.general)

    const [errorsEmail, setErrorsEmail] = useState({})

    const [openEmail, setOpenEmail] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);


    const dispatch = useDispatch()

    const handleCloseEmail = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenEmail(false);
      };

      const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSuccess(false);
      };

    const handleChange = (e) => {
        e.preventDefault();
        setInput({...input,[e.target.name]: e.target.value})
        setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
    }


      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendEmail(input.email))
        setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
        setInput({
          email: '',
        })
      }

      React.useEffect(() => {
        // console.log(logInError)
        if(logInError === 'that user does not exist'){
          setOpenEmail(true)
          errorsEmail.email = "Unregistered Email"
          document.getElementById('email').classList.add('login__group-incorrecto')
          document.getElementById('email').classList.remove('login__group-correcto')
          document.querySelector('#email .login__input-error').classList.add('login__input-error-activo')
        } 
        if (logInError === 'We have sent an email to your mailbox so that you can update your password'){
          setOpenSuccess(true)
        }
      },[logInError]); 

  return (
    <div className='login'>
        <div className = {`login__wrapper ${s.loginContainer}`}>

            <div className='login__group'>
            <h1 className="login__title">Forgot Password</h1>
            </div>

            <div className='login__group' id='email'>
            <p className='login__text'>We'll send you an email to restore your password</p>
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
            <div className='login__group' >
                <button type='submit' className="login__btn" onClick={(e) => handleSubmit(e)} >Submit</button>
            </div>

            <Snackbar autoHideDuration={4000} open={openEmail} onClose={handleCloseEmail}>
                <Alert onClose={handleCloseEmail} severity="error" sx={{ width: '100%' }}>
                    Unregistered Email
                </Alert>
            </Snackbar>

            <Snackbar autoHideDuration={4000} open={openSuccess} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                We've sent an email to restore your password
                </Alert>
            </Snackbar>

        </div>
    </div>
  )
}
