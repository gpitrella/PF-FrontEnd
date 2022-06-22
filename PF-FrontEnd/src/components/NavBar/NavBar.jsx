import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/actions';

import './NavBar.css';
import searchIcon from './img/searchIcon.png';
import imageLogo from './img/logoDotTech.gif';
import imgCarrito from './img/img_carrito.png';
import imgMensaje from './img/img_mensaje.png';
import imgCorazon from './img/heart-icon.png'

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const { theme } = useSelector(state => state.general);
  const dispatch = useDispatch();

    const toggleNav = () => {
      setToggleMenu(!toggleMenu);
    };

    useEffect(() => {

      const changeWidth = () => {
        setScreenWidth(window.innerWidth);
      }
      window.addEventListener('resize', changeWidth)
      return () => {
        window.removeEventListener('resize', changeWidth)
    }
  
    }, [])
    
    function handleSearch(e) {
        e.preventDefault();
    };

    function handleSubmit(e) {
        e.preventDefault();
    }

    function handleCheck() {
      dispatch(changeTheme());
    }
       
    return (
      <nav>
            <span className='navBarLogo'>
                <Link to="/"><img className="imageLogo" src={imageLogo} alt='Logo Tech Ecommerce' /></Link>
            </span>
          {(toggleMenu || screenWidth > 500) && (
            <ul className='list'>
                <li className="items">
                  <form>
                    <label className="switch">
                       Tema:
                           <input type="checkbox" name="name" onChange = {handleCheck} checked = {theme === THEME.DARK}/>
                           <span className="slider"></span>
                    </label>
                  </form>
                </li>
                <li className="items">
                  <form className="search-container">
                    <input type='text' className="inputSearchBar" id='name' placeholder='Buscar Producto ...' autoComplete='off' onChange={(e) => handleSearch(e)}></input>
                    <img type='submit' className="search-icon" src={searchIcon} alt='icono search' onClick={(e) => handleSubmit(e)}/>
                  </form>
                </li >
                <li className="items">
                  <Link to="/"><img className="imgCorazon" src={imgCorazon} alt='carrito de compra' /></Link>
                </li>
                <li className="items">
                    <Link to="/"><img className="imgCarrito" src={imgCarrito} alt='carrito de compra' /></Link>
                </li>
                <li className="items">
                    <Link to="/"><img className="imgMensaje" src={imgMensaje} alt='casilla de mensajes' /></Link>
                </li>
                <li className="items">
                    <Link className="Login" to="/login">Login/Logout</Link>
                </li>
              </ul>
            )}
            <>
              <button className='btnNavbar' onClick={toggleNav}>BTN</button>
            </>
      </nav>
    )
};

const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}