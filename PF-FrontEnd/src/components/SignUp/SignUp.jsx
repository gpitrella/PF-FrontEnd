import React from 'react'
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/actions";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function SignUp() {

    const [ input, setInput ] = useState({
        username: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signUp(input.username, input.email, input.password))
      }    

    return (

<div className="login">
        <h1 className="loginTitle">Sign Up</h1>
        <div className="wrapper">
            <div className="right">

                <input type="text"
                name={"username"}
                value={input.username}
                placeholder="Username"
                onChange={(e) => handleChange(e)}
                />

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

                <button type='submit' className="submit" onClick={(e) => handleSubmit(e)} >Sign Up</button>
                <p className="text">Already a user? <Link to='/login' className="link">Log In</Link></p>
            </div>
        </div>
    </div>
  )
}
