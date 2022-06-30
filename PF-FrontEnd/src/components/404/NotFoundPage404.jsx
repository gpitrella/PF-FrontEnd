import React from "react";
import gitfNotFound from './img/notFoundPage.gif';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './NotFoundPage404.css';

export default function notFoundPage(){
    return (
        <div className="notfoundpage">
            <img className="imgNotFound"
              alt="not Found"
              src={gitfNotFound}
            />
            <div className="notfoundpage_text">
                <h2>Page Not Found</h2>
                <p>
                    We have searched everywhere for this page. <br></br>
                    Please check the route you entered. <br></br>
                    We leave you a button so you can return to Home.
                </p>
                <Link to="/">
                    <Button id="button_less" variant="outlined" size="medium">HOME</Button>
                </Link>
            </div>
        </div>
    )
};