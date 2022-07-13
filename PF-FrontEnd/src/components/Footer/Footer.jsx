import React from 'react';
import { Link } from 'react-router-dom';
import facebook from './img/btn-facebook.png'
import instagram from './img/btn-instagram.png'
import twitter from './img/btn-twitter.png'
import logo from "./img/logo_TechMarket.gif"
import MapBranches from '../MapStore/MapBranches';
import './Footer.css'


export default function Footer() {

    return (
        <div className='footer'>
            <div className='container'>
                <div className='row'>
                    <div className="footer__column">
                        <h4>Info</h4>
                            <li className='footer__li'><Link to='/contactus' className='footer__link'>Contact us</Link></li>
                            <li className='footer__li'><Link to='/branches' className='footer__link'>Adresses</Link></li>
                            <li className='footer__li'><Link to='/mapbranches' className='footer__link'>View Map Branches</Link></li>

                            <li className='footer__li'><Link to='/faqs' className='footer__link'>FAQs</Link></li>
                    </div>

                    <div className="footer__column">
                        <h4>User</h4>
                            <li className='footer__li'><Link to='' className='footer__link'>Your Account</Link></li>
                            <li className='footer__li'><Link to='' className='footer__link'>Your Orders</Link></li>
                    </div>

                    <div className="footer__column">
                        <h4>Let Us Help You</h4>
                            <li className='footer__li'><Link to='' className='footer__link'>Shipping Rates & Policies</Link></li>
                            <li className='footer__li'><Link to='' className='footer__link'>Returns & Replacements</Link></li>
                    </div>

                    <div className="footer__column">
                        <Link to='/'><img src={logo} alt="" className='logo__img'/></Link>
                        <h4>Follow Us!</h4>
                        <div className='footer_socials'>
                            <li className='footer__li'><a href='https://www.facebook.com/' target="_blank"><img className='footer__img' src={facebook}/></a></li>
                            <li className='footer__li'><a href='https://www.instagram.com/' target="_blank"><img className='footer__img' src={instagram}/></a></li>
                            <li className='footer__li'><a href='https://twitter.com/' target="_blank"><img className='footer__img' src={twitter}/></a></li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};