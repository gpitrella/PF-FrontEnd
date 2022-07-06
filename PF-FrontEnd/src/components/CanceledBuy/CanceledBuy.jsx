import React from "react";
import buycancel from './img/buycancel.gif';
import Button from '@mui/material/Button';
// import { successBuyAction } from "../../redux/actions";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './CanceledBuy.css';

export default function CanceledBuy(){
    const dispatch = useDispatch();
    React.useEffect(() => {
        // dispatch(successBuyAction());
    }, []);  
    

    return (
        <div className="canceled_buy_page">
            <img className="img_canceled_buy_page"
              alt="Buy canceled"
              src={buycancel}
            />
            <div className="canceled_page_text">
                <h2>Sorry there was a problem with your order, it was canceled.</h2>
                <p>
                    Contact your bank to ask about canceling your purchase. <br></br>
                    Any questions do not hesitate to contact us. 
                </p>
                <Link to="/">
                    <Button id="button_less" variant="outlined" size="medium"> HOME </Button>
                </Link>
            </div>
        </div>
    )
};