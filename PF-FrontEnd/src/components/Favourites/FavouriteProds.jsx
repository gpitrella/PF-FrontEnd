import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { removeFavourite, getFavouritesProducts } from "../../redux/actions";
import './FavouriteProds.module.css';
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

export default function FavouriteProducts({showCart}){
  const dispatch = useDispatch();
  const history = useHistory();
  const { oneuser } = useSelector((state) => state.user);

  const [openComment, setOpenComment] = useState(false);


// Cartel desplegable de Login
const [openLogin, setOpenLogin] = useState(false);

const handleClickOpenLogin = () => {
    setOpenLogin(true);
};

const handleCloseLogin = () => {
    setOpenLogin(false);
};

const handleOpenPageLogin = () => {
    dispatch(closeFavs())
    history.push('/login');
;}

const { favouritesProducts } = useSelector((state) => state.general)

const handleCloseFavourites = (e) => {
  e.preventDefault();
  dispatch(closeFavs())
};

const handleRemoveFromFavs = (id) => {
  dispatch(removeFavourite(id, oneuser.id));
};


  return (
    <div>
      <div>
      <Dialog
        open={showCart}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseFavourites}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"MY WISHLIST"}</DialogTitle>
        <DialogContent>
        <hr/>
          <DialogContentText id="alert-dialog-slide-description">
            
            
          <div className="container_secundary">
         {favouritesProducts?.length === 0 
                 ? <p>You have no favourite products</p>
                 : favouritesProducts?.map((e) => {
                     return (
                     <div className="favourites_mainblock">
                        <img className="img_favourites" src={e?.image} alt={e?.name} />
                        <div className="favourites_name">
                            <h5>{e?.name}</h5>
                            <h5><strong>Price: </strong> ${e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price} {`${e?.discount ? `- ${e?.discount}% incl.` : ''}`}</h5>
                         </div>
                         <div>
                            <DeleteForeverIcon onClick={() => handleRemoveFromFavs(e?.id)}/>
                         </div>
                     </div>
                 )})}

                </div>
                 </DialogContentText>
                    </DialogContent>
                  </Dialog>
                  <Snackbar open={openComment} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                      <Alert onClose={handleCloseSuccessComment} severity="warning" sx={{ width: '100%' }}>
                          No products in Cart!
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
                            such as exclusive discounts or additional promotions.
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