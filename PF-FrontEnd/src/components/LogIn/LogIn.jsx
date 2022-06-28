import Google from "./google.png";
import Facebook from "./facebook.png";
import Github from "./github.png";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../redux/actions";
import './LogIn.css'
import { useState } from "react";

const LogIn = () => {

  const google = () => {
    window.open("http://localhost:3001/api/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3001/api/auth/github", "_self");
  };

  const facebook = () => {
    window.open("http://localhost:3001/api/auth/facebook", "_self");
  };

    const [ register, setRegister ] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [ getIn, setGetIn ] = useState({
        email: '',
        password: ''
    })

    const handleChangeIn = (e) => {
        e.preventDefault();
        setGetIn({
            ...getIn,
            [e.target.name]: e.target.value
        })
    }
    const handleChangeUp = (e) => {
            e.preventDefault();
            setRegister({
                ...register,
                [e.target.name]: e.target.value
            })
        }
    

  const dispatch = useDispatch();

  const handleLogIn = (e) => {
    e.preventDefault();
    console.log(getIn)
    dispatch(logIn(getIn.email, getIn.password))
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(signUp(register.username, register.email, register.password))
  }

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="email" name={"email"} value={getIn.email} placeholder="Email" onChange={(e) => handleChangeIn(e)}/>
          <input type="password" name={"password"} value={getIn.password} placeholder="Password" onChange={(e) => handleChangeIn(e)}/>
          <button type='submit' className="submit" onClick={(e) => handleLogIn(e)} >Log In</button>
          <br />
          <br />
          <input type="text" name={"username"} value={register.username} placeholder="Username" onChange={(e) => handleChangeUp(e)}/>
          <input type="email" name={"email"} value={register.email} placeholder="Email" onChange={(e) => handleChangeUp(e)}/>
          <input type="password" name={"password"} value={register.password} placeholder="Password" onChange={(e) => handleChangeUp(e)}/>
          <button type='submit' className="submit" onClick={(e) => handleSignUp(e)} >Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;