import React from 'react'
import BasicModal from '../common/BasicModal/BasicModal';


const FinishedModal = ({ open, onClose, openCart }) => {
    
    const goToCart = () => {
        openCart();
    };


return (
    <BasicModal
        open={open}
        onClose={onClose}
        title="LAST STEP"
        subTitle="SUBMIT to see the products on your CART and CHECK OUT."
        onSubmit={() => goToCart()}
    />
        
)
}

export default FinishedModal;