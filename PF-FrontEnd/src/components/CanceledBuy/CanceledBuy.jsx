import React from "react";
import buycancel from './img/buycancel.gif';
import Button from '@mui/material/Button';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { successBuyAction, getOrderByUser, putStatusByOrder, closeLanding } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import './CanceledBuy.css';

export default function CanceledBuy(){
    const { user } = useSelector((state) => state.general);
    const { orderByUser } = useSelector((state) => state.general)
    const history = useHistory();
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
            if(findOrder?.id && status === 'rejected') {
                console.log(findOrder)
                console.log(findOrder.id)
                dispatch(putStatusByOrder(findOrder.id, 'cancelled'))
            }
        }
        
    }, [orderByUser]);
    
    const handleOpenPage = () => {
        history.push('/');
        window.location.reload(false)
    }

    return (
        <div className="canceled_buy_page">
            <img className="img_canceled_buy_page"
              alt="Buy canceled"
              src={buycancel}
            />
            <div className="canceled_page_text">
                <h2>Sorry there was a problem with your order, it was canceled.</h2>
                <p>
                    Contact your bank to ask about your purchase canceled. <br></br>
                    Any questions do not hesitate to contact us. 
                </p>
                <Button id="button_less" variant="outlined" size="medium" onClick={handleOpenPage}> HOME </Button>
            </div>
        </div>
    )
};