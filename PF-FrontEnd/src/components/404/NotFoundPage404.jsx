import React from "react";
import gitfNotFound from './img/notFoundPage.gif';
import Box from '@mui/material/Box';
import './NotFoundPage404.css';

export default function notFoundPage(){
    return (
        <div className="notfoundpage">
            <img className="imgNotFound"
              alt="not Found"
              src={gitfNotFound}
            />
        </div>
    )
};