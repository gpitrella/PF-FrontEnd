import React from "react";
import compraok from './img/compraok.png';
import Button from '@mui/material/Button';
import { successBuyAction } from "../../redux/actions";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SuccessBuy.css';

export default function SuccessBuy(){
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(successBuyAction());
    }, []);  
    

    return (
        <div className="notfoundpage">
            <img className="imgNotFound"
              alt="not Found"
              src={compraok}
            />
            <div className="notfoundpage_text">
                <h2>Thank you for your Purchase</h2>
                <p>
                    We invite you to search for more <br></br>
                    products that you are needing. 
                </p>
                <Link to="/">
                    <Button id="button_less" variant="outlined" size="medium">HOME</Button>
                </Link>
            </div>
        </div>
    )
};