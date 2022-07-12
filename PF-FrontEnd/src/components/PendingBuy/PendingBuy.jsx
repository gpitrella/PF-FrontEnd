import React from "react";
import buypending from './img/buypending.gif';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import { successBuyAction, getOrderByUser, putStatusByOrder, closeLanding } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import './PendingBuy.css';

export default function PendingBuy(){
    const { user } = useSelector((state) => state.general);
    const { orderByUser } = useSelector((state) => state.general)
    const search = useLocation().search;
    const idMP = new URLSearchParams(search).get('preference_id');
    const status = new URLSearchParams(search).get('collection_status');
   
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getOrderByUser(user?.user.id));
        dispatch(successBuyAction());
        dispatch(closeLanding());
    }, []); 

    React.useEffect(() => {
        if(orderByUser){
            const findOrder = orderByUser.purchase_orders?.find((order) => order.idMP == idMP);
            if(findOrder?.id && status === 'pending') {
                console.log(findOrder)
                console.log(findOrder.id)
                dispatch(putStatusByOrder(findOrder.id, 'pending'))
            }
        }
        
    }, [orderByUser]);  
    

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