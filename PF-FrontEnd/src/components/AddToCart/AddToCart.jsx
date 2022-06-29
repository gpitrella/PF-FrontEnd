import React from "react";
// import { Button } from "@material-ui/core";
// import { CartItemType } from "../App"; -- importa los productos agregados al carrito
import { useSelector } from 'react-redux';
import './AddToCart.css';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });



// import { Wrapper } from "./CartItem.styles"; -- importa stilos

// agrega mas productos o retira:
// type Props = {
//   item: CartItemType;
//   addToCart: (clickedItem: CartItemType) => void;
//   removeFromCart: (id: number) => void;
// };

// const CartItem = ({ item, addToCart, removeFromCart }: Props) => {

    





export default function AddToCart(){
const productsCart = useSelector((state) => state.general.productsCart)
///////////////////////////////
const [openAddtoCart, setOpenAddtoCart] = React.useState(false);

const handleClickOpenAddtoCart = () => {
    setOpenAddtoCart(true);
};

const handleCloseAddtoCart = () => {
  setOpenAddtoCart(false);
};

console.log(productsCart)

  return (
    <div>
      <div>
      <Button variant="outlined" onClick={handleClickOpenAddtoCart}>
        Slide in alert dialog
      </Button>
      <Dialog
        open={openAddtoCart}
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
                 ? <p>Sin productos agregados al carrito</p>
                 : productsCart?.map((e) => {
                     return (
                     <div className="addtocart_mainblock">
                        <img className="img_addtocart" src={e.image} alt={e.title} />
                        <div className="addtocart_name">
                            <h5>{e.name}</h5>
                            <h5><strong>Price: </strong> ${e.discount ? Math.round(e.price - e.price * (e.discount / 100)) : e.price} {`${e.discount ? `- ${e.discount}% incl.` : ''}`}</h5>
                         </div>
                         
                         <div className="buttons_addtocart">
                            <Button id="button_less" variant="outlined" size="small">-</Button>
                                           <p>{1}</p>
                            <Button id="button_less" variant="outlined" size="small">+</Button>
                         </div>
                         <div className="information_addtocart">
                             <p>Total: ${(1 * e.price)}</p>
                         </div>
                        
                     </div>
                 )})}
                 <div>
                 {productsCart?.length === 0 
                 ? <span></span>
                 : productsCart?.map((e) => {
                     return (
                     <div className="addtocart_mainblock">
                        <img className="img_addtocart" src={e.image} alt={e.title} />
                        <div className="addtocart_name">
                            <h5>{e.name}</h5>
                            <h5><strong>Price: </strong> ${e.discount ? Math.round(e.price - e.price * (e.discount / 100)) : e.price} {`${e.discount ? `- ${e.discount}% incl.` : ''}`}</h5>
                         </div>
                         
                         <div className="buttons_addtocart">
                            <Button id="button_less" variant="outlined" size="small">-</Button>
                                           <p>{1}</p>
                            <Button id="button_less" variant="outlined" size="small">+</Button>
                         </div>
                         <div className="information_addtocart">
                             <p>Total: ${(1 * e.price)}</p>
                         </div>
                        
                     </div>
                 )})}
                 </div>
                 </div>


                 </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddtoCart}>View More ...</Button>
          <Button onClick={handleCloseAddtoCart}>Check Out</Button>
        </DialogActions>
      </Dialog>
    </div>
    </div>
    // <div className="container_addtocart">
    //     <div className="container_secundary">
    //     {productsCart?.length === 0 
    //             ? <p>Sin productos agregados al carrito</p>
    //             : productsCart?.map((e) => {
    //                 return (
    //                 <div>
    //                     <img className="img_addtocart" src={e.image} alt={e.title} />
    //                     <h3>{e.name}</h3>
    //                     <div className="information_addtocart">
    //                         <p>Price: ${e.price}</p>
    //                         <p>Total: ${(1 * e.price)}</p>
    //                     </div>
    //                     <div className="buttons_addtocart">
    //                         <Button
    //                             size="small"
    //                             disableElevation
    //                             variant="contained"
                                
    //                         >
    //                             -
    //                         </Button>
    //                         <p>{1}</p>
    //                         <Button
    //                             size="small"
    //                             disableElevation
    //                             variant="contained"
                                
    //                         >
    //                             +
    //                         </Button>
    //                     </div>
                        
    //                 </div>
    //             )})}
    //             </div>
    // </div>
    
  );
};