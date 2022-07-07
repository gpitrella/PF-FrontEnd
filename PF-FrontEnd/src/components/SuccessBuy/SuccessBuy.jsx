import React from "react";
import compraok from './img/buyok.gif';
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
        <div className="success_buy_page">
            <img className="img_success_buy_page"
              alt="Buy Success"
              src={compraok}
            />
            <div className="success_page_text">
                <h2>Thank you for your Purchase</h2>
                <p>
                    We invite you to search for more <br></br>
                    products that you are needing. 
                </p>
                <Link to="/">
                    <Button id="button_less" variant="outlined" size="medium"> HOME </Button>
                </Link>
            </div>
        </div>
    )
};