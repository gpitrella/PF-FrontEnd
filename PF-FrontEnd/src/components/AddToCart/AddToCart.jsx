import React, { useState } from "react";
// import { Button } from "@material-ui/core";
// import { CartItemType } from "../App"; -- importa los productos agregados al carrito
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import { removeProductFromCart, increaseQuantityToProductCart, reduceQuantityToProductCart, closeCart } from "../../redux/actions";
import './AddToCart.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Divider from '@mui/material/Divider';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


export default function AddToCart({showCart}){
const [redirect, setRedirect] = useState({value: false})
const productsCart = useSelector((state) => state.general.productsCart)
const dispatch = useDispatch();

const handleCloseAddtoCart = (e) => {
  e.preventDefault();
  dispatch(closeCart())
};

const handleCloseCartToCheckOut = (e) => {
  e.preventDefault();
  setRedirect({value: true})
  dispatch(closeCart());
};

const increaseAmountToCart = (id) => {
  productsCart.map((product) => {
    if(product.id === id && product.stock > 1){
      dispatch(increaseQuantityToProductCart(id))
    } 
    // setAmountCart(productsCart)
    // AGREGAR CONDICION CUANDO EL STOCK ESTA EN O   
  })
};

const reduceAmountToCart = (id) => {
  productsCart.map((product) => {
    if(product.id === id && product?.quantity > 0){
      dispatch(reduceQuantityToProductCart(id))
    }
  })
};

const handleRemoveFromCart = (id) => {
  dispatch(removeProductFromCart(id));
};

let resultTotalValue = 0;
const totalValue = () => {
  productsCart.map((product) => {
    resultTotalValue += product?.quantity * (product.discount !== 0 ? Math.round(product.price - product.price * (product.discount / 100)) : product.price)
  })
};
totalValue();

React.useEffect(() => {
  totalValue();
}, [dispatch]);

  return (
    <div>
      <div>
      <Dialog
        open={showCart}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAddtoCart}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Products Cart:"}</DialogTitle>
        <DialogContent>
        <hr/>
          <DialogContentText id="alert-dialog-slide-description">
            
            
          <div className="container_secundary">
         {productsCart?.length === 0 
                 ? <p>No products added to cart.</p>
                 : productsCart?.map((e) => {
                     return (
                     <div className="addtocart_mainblock">
                        <img className="img_addtocart" src={e?.image} alt={e?.name} />
                        <div className="addtocart_name">
                            <h5>{e?.name}</h5>
                            <h5><strong>Price: </strong> ${e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price} {`${e?.discount ? `- ${e?.discount}% incl.` : ''}`}</h5>
                         </div>
                         <div className="quantity_price">
                            <div>
                                <p className="information_addtocart">Total: ${(e?.quantity * (e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price))}</p>
                            </div>
                            <div className="buttons_addtocart">
                                <Button id="button_less" variant="outlined" size="small" onClick={() => reduceAmountToCart(e?.id)}>-</Button>
                                              <p>{e?.quantity}</p>
                                <Button id="button_less" variant="outlined" size="small" onClick={() => increaseAmountToCart(e?.id)}>+</Button>
                            </div>
                         </div>
                         <div>
                            <DeleteForeverIcon onClick={() => handleRemoveFromCart(e?.id)}/>
                         </div>
                     </div>
                 )})}
                 <div>
                 <Divider></Divider>
                 {productsCart?.length === 0 
                        ? <span></span>
                        : (<div className="information_addtocart">
                                <p className="total_value_cart">Total Value: ${resultTotalValue}</p>
                            </div>
                 )}
                 </div>
                </div>
                 </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='button_add_to_cart' onClick={handleCloseAddtoCart}>View More</Button>
          {redirect.value ? <Redirect push to={'/checkout'} underline="none" /> : null}
          <Button className='button_add_to_cart' onClick={handleCloseCartToCheckOut}>Check Out</Button>
          
        </DialogActions>
      </Dialog>
    </div>
    </div>
  );
};