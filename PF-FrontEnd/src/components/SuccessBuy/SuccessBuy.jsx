import React from "react";
import compraok from './img/buyok.gif';
import Button from '@mui/material/Button';
import { successBuyAction, getOrderByUser, putStatusByOrder, closeLanding } from "../../redux/actions";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './SuccessBuy.css';

export default function SuccessBuy(){
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

    const handleOpenPage = () => {
        history.push('/https://techmarketfront.vercel.app');
    }

    React.useEffect(() => {
        if(orderByUser){
            const findOrder = orderByUser.purchase_orders?.find((order) => order.idMP == idMP);
            if(findOrder?.id && status === 'approved') {
                dispatch(putStatusByOrder(findOrder.id, 'processing'))
            }
        }
        
    }, [orderByUser]); 
    

    return (
        <div className="success_buy_page">
            <img className="img_success_buy_page"
              alt="Buy Success"
              src={compraok}
            />
            <div className="success_page_text">
                <h2>{user?.user.name} Thank you for your Purchase</h2>
                <p>
                    We invite you to search for more <br></br>
                    products that you are needing. 
                </p>
                <Button id="button_less" variant="outlined" size="medium" onClick={handleOpenPage}> HOME </Button>
            </div>
        </div>
    )
};