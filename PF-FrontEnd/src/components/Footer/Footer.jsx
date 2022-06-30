import React from 'react';
import { Link } from 'react-router-dom';
import facebook from './img/btn-facebook.png'
import instagram from './img/btn-instagram.png'
import twitter from './img/btn-twitter.png'
import logo from "./img/logo_TechMarket.gif"
import './Footer.css'


export default function Footer() {

    return (
        <div className='cntfooter'>
            <div className='cnttext'>
                <h3>Information</h3>
                <Link to='/contactus' className='footerlink'>Contact us</Link>
                <Link to='' className='footerlink'>Adresses</Link>
                <Link to='/faqs' className='footerlink'>FAQs</Link>
            </div>
            <div className='cnttext'>
                <h3>Make Money with Us</h3>
                <Link to='' className='footerlink'>Sell products on Amazon</Link>
                <Link to='' className='footerlink'>Become an Affiliate</Link>
                <Link to='' className='footerlink'>Advertise Your Products</Link>
            </div>
            <div className='cnttext'>
                <h3>Let Us Help You</h3>
                <Link to='' className='footerlink'>Your Account</Link>
                <Link to='' className='footerlink'>Your Orders</Link>
                <Link to='' className='footerlink'>Shipping Rates & Policies</Link>
                <Link to='' className='footerlink'>Returns & Replacements</Link>
            </div>
            <div className='cntsocial'>
                <img className='imgLogo' src={logo} alt="" />
                <h3>Follow Us in our Socials!</h3>
                <a href='https://www.facebook.com/' target="_blank"><img className='imgFooter' src={facebook}/></a>
                <a href='https://www.instagram.com/' target="_blank"><img className='imgFooter' src={instagram}/></a>
                <a href='https://twitter.com/' target="_blank"><img className='imgFooter' src={twitter}/></a>
            </div>
        </div>
    )
};