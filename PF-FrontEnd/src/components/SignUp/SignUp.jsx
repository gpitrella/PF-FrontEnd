import React from 'react'
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { validateUsername, validateEmail, validatePassword } from './validate';
import './SignUp.css'

export default function SignUp() {

    const [ input, setInput ] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [errorsEmail, setErrorsEmail] = useState({})
    const [errorsPasword, setErrorsPassword] = useState({})

    const handleChange = (e) => {
        e.preventDefault();
        setInput({...input,[e.target.name]: e.target.value})
        setErrors(validateUsername({...input,[e.target.name]: e.target.value}))
        setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
        setErrorsPassword(validatePassword({...input,[e.target.name]: e.target.value}))
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(input.username, input.email, input.password))
        setErrors(validateUsername({...input,[e.target.name]: e.target.value}))
        setErrorsEmail(validateEmail({...input,[e.target.name]: e.target.value}))
        setErrorsPassword(validatePassword({...input,[e.target.name]: e.target.value}))
      }    

    return (

    <div className="login">
        <div className="signup__wrapper">

                <h1 className="signup__title">Sign Up</h1>

                <div className='signup__group' id='username'>
                    <input
                    type="text"
                    name={"username"}
                    id={"username"}
                    value={input.username}
                    placeholder="Username"
                    onChange={(e) => handleChange(e)}
                    className='signup__input'
                    />
                    <p className='signup__input-error'>{errors.username}</p>
                </div>

                <div className='signup__group' id='email'>
                    <input
                    type="email"
                    name={"email"}
                    id={"email"}
                    value={input.email}
                    placeholder="Email"
                    onChange={(e) => handleChange(e)}
                    className='signup__input'
                    />
                    <p className='signup__input-error'>{errorsEmail.email}</p>
                </div>

                <div className='signup__group' id='password'>
                    <input
                    type="password"
                    name={"password"}
                    value={input.password}
                    placeholder="Password"
                    onChange={(e) => handleChange(e)}
                    className='signup__input'
                    />
                    <p className='signup__input-error'>{errorsPasword.password}</p>
                </div>
                
                <div className='signup__group' >
                <button type='submit' className="signup__btn" onClick={(e) => handleSubmit(e)} >Sign Up</button>
                </div>
                <p className="signup__text">Already a user? <Link to='/login' className="link">Log In</Link></p>
        </div>
    </div>
  )
}
