import React from "react";
import buypending from './img/buypending.gif';
import Button from '@mui/material/Button';
// import { successBuyAction } from "../../redux/actions";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './PendingBuy.css';

export default function PendingBuy(){
    const dispatch = useDispatch();
    React.useEffect(() => {
        // dispatch(successBuyAction());
    }, []);  
    

    return (
        <div className="pending_buy_page">
            <img className="img_pending_buy_page"
              alt="Buy pending"
              src={buypending}
            />
            <div className="pending_page_text">
                <h2>Your order are pending.</h2>
                <p>
                    Contact your bank to ask about your pending purchase, <br></br>
                    or contact Us and we check any problem about your order. 
                </p>
                <Link to="/">
                    <Button id="button_less" variant="outlined" size="medium"> HOME </Button>
                </Link>
            </div>
        </div>
    )
};