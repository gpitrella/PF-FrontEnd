import React from "react";
import gitfLogo from './img/logo_TechMarket.gif';
import './Landing.css';

export default function Landing() {
    
    const left = document.getElementsByClassName('left')
    const right = document.getElementsByClassName('right')
    const [ container, setContainer ] = React.useState('container_landing_page');
    
    const handleEnterLeft = () => {
        setContainer('hover-left')
    };

    const handleLeaveLeft = () => {
        setContainer('container_landing_page')
    };

    const handleEnterRight = () => {
        setContainer('hover-right')
    };

    const handleLeaveRight = () => {
        setContainer('container_landing_page')
    };

    return (
        <div className="main_landing_page">
            <div className={container}>
                <div className="split left" onMouseEnter={handleEnterLeft} onMouseLeave={handleLeaveLeft}>
                    <h1>Welcome to TechMarket</h1>
                    <img src={gitfLogo} className="btn_image_logo" alt='logo techmarket' />
                    {/* <a href="#" className="btn">Buy Now</a> */}
                </div>
                <div className="split right" onMouseEnter={handleEnterRight} onMouseLeave={handleLeaveRight}>
                    <a href="#" className="btn">Start</a>
                </div>
            </div>
        </div>
    )
}