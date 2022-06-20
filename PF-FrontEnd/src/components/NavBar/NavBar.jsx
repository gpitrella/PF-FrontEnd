import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './NavBar.css';
import searchIcon from './img/searchIcon.png';
import imageLogo from './img/logo_tech_ecommerce.png';
import imgCarrito from './img/img_carrito.png';
import imgMensaje from './img/img_mensaje.png';

export default function NavBar() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

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
       
    return (
        <nav>
          {(toggleMenu || screenWidth > 500) && (
              
            <ul className='list'>
                <li className='navBarLogo'>
                    <Link to="/"><img className="imageLogo" src={imageLogo} alt='Logo Tech Ecommerce' /></Link>
                </li>
                <li>
                  <form>
                    <label className="switch">
                       Tema:
                           <input type="checkbox" name="name" />
                           <span className="slider"></span>
                    </label>
                  </form>
                </li>
                
                <li>
                  <form className="search-container">
                    <input type='text' id='name' placeholder='Buscar Producto ...' autoComplete='off' onChange={(e) => handleSearch(e)}></input>
                    <img type='submit' className="search-icon" src={searchIcon} alt='icono search' onClick={(e) => handleSubmit(e)}/>
                  </form>
                </li>
                <li>
                    <Link to="/"><img className="imgCarrito" src={imgCarrito} alt='carrito de compra' /></Link>
                </li>
                <li>
                    <Link to="/"><img className="imgMensaje" src={imgMensaje} alt='casilla de mensajes' /></Link>
                </li>
                <li>
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