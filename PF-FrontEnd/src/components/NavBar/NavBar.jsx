import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import searchIcon from './img/searchIcon.png';
import imageLogo from './img/logo_tech_ecommerce.png';
import imgCarrito from './img/img_carrito.png';
import imgMensaje from './img/img_mensaje.png';

export default function NavBar() {
    
    function handleSearch(e) {
        e.preventDefault();
    };

    function handleSubmit(e) {
        e.preventDefault();
    }
       
    return (
        <header className='header'>
            <div className='navbar'>
                <div className='navBarLogo'>
                    <Link to="/"><img className="imageLogo" src={imageLogo} alt='Logo Tech Ecommerce' /></Link>
                </div>
                <form className="search-container">
                   <input type='text' id='name' placeholder='Buscar Producto ...' autoComplete='off' onChange={(e) => handleSearch(e)}></input>
                   <img type='submit' className="search-icon" src={searchIcon} alt='icono search' onClick={(e) => handleSubmit(e)}/>
                </form>
                <div>
                    <Link to="/"><img className="imgCarrito" src={imgCarrito} alt='carrito de compra' /></Link>
                </div>
                <div>
                    <Link to="/"><img className="imgMensaje" src={imgMensaje} alt='casilla de mensajes' /></Link>
                </div>
                <div>
                    <Link className="Login" to="/login">Login/Logout</Link>
                </div>
            </div>
        </header>
    )
};