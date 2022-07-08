import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import cart from './img/cart.gif'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

// Box Desplegable para Logearse:
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AddToCart({showCart}){
const [openComment, setOpenComment] = React.useState(false);
const [openWithOutStock, setOpenWithOutStock] = React.useState(false);
const { user } = useSelector((state) => state.general)
const history = useHistory();

// Cartel desplegable de Login
const [openLogin, setOpenLogin] = React.useState(false);

const handleClickOpenLogin = () => {
    setOpenLogin(true);
};

const handleCloseLogin = () => {
    setOpenLogin(false);
};

const handleOpenPageLogin = () => {
    dispatch(closeCart())
    history.push('/login');
;}

const productsCart = useSelector((state) => state.general.productsCart)
const dispatch = useDispatch();

const handleCloseAddtoCart = (e) => {
  e.preventDefault();
  dispatch(closeCart())
};

const handleCloseCartToCheckOut = (e) => {
  e.preventDefault();
  if(productsCart?.length > 0 && user?.user){
    dispatch(closeCart());
    history.push('/checkout');
  } 
  if(productsCart?.length > 0 && !user?.user){
    handleClickOpenLogin();
  } 
  if(productsCart?.length === 0) {
    setOpenComment(true)
  }
};

const increaseAmountToCart = (id) => {
  productsCart.map((product) => {
    if(product.id === id && product.stock > 1 && product.stock > product.quantity){
      dispatch(increaseQuantityToProductCart(id))
    } 
    if(product.id === id && product.stock === product.quantity) {
      setOpenWithOutStock(true)
    }
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

const handleCloseSuccessComment = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenComment(false);
  setOpenWithOutStock(false);
  setOpenLogin(false);
};

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
        <div className="title_addtocart_popup">
          <img className="img_checkout_secure" src={cart} alt='cart' />
          <strong >
            <h3 id="title_productincart_popup"> Products Cart: </h3>
          </strong>
        </div>
        <DialogContent id="main_box_addtocart">
        <hr/>
          <DialogContentText id="alert-dialog-slide-description">
          <div className="container_secundary">
         {productsCart?.length === 0 
                 ? <p>No products added to cart.</p>
                 : productsCart?.map((e) => {
                     return (
                     <div className="addtocart_mainblock" key={parseInt(Math.random() * 10000 / Math.random())}>
                        <img className="img_addtocart" src={e?.image} alt={e?.name} />
                        <div className="addtocart_name">
                            <h5>{e?.name}</h5>
                            <h5><strong>Price: </strong> ${e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price} {`${e?.discount ? `- ${e?.discount}% incl.` : ''}`}</h5>
                         </div>
                         <div className="quantity_price">
                            <div>
                                <p className="information_addtocart">SubTotal: ${(e?.quantity * (e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price))}</p>
                            </div>
                            <div className="buttons_addtocart">
                                <Button id="button_less" variant="outlined" size="small" onClick={() => reduceAmountToCart(e?.id)}>-</Button>
                                              <p>{e?.quantity}</p>
                                <Button id="button_less" variant="outlined" size="small" onClick={() => increaseAmountToCart(e?.id)}>+</Button>
                            </div>
                         </div>
                         <div>
                            <DeleteForeverIcon className='remove_items_addtocart' onClick={() => handleRemoveFromCart(e?.id)}/>
                         </div>
                     </div>
                 )})}
                 <div>
                 <Divider></Divider>
                 {productsCart?.length === 0 
                        ? <span></span>
                        : (<div className="information_addtocart">
                                <strong><p className="total_value_cart">Total: ${resultTotalValue}</p></strong>
                            </div>
                 )}
                 </div>
                </div>
                 </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="contained" size="small" onClick={handleCloseAddtoCart}>View More</Button>
                      <Button variant="contained" size="small" onClick={handleCloseCartToCheckOut}>Check Out</Button>
                    </DialogActions>
                  </Dialog>
                  <Snackbar open={openComment} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                      <Alert onClose={handleCloseSuccessComment} severity="warning" sx={{ width: '100%' }}>
                          No products in Cart!
                      </Alert>
                  </Snackbar>
                  <Snackbar open={openWithOutStock} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                      <Alert onClose={handleCloseSuccessComment} severity="warning" sx={{ width: '100%' }}>
                          Sorry We don't have more stock!
                      </Alert>
                  </Snackbar>
                </div>
                <div>
                <BootstrapDialog
                    onClose={handleCloseLogin}
                    aria-labelledby="customized-dialog-title"
                    open={openLogin}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseLogin}>
                        You must be Login:
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Register or Log in to be able to make an order and discover 
                            all the functionalities of the website, 
                            such as exclusive discounts, additional promotions, etc.
                        </Typography>
                    </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleOpenPageLogin}>
                                Login
                            </Button>
                        </DialogActions>
                </BootstrapDialog>
            </div>
    </div>
  );
};