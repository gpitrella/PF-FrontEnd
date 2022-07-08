import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { removeFavourite, getFavouritesProducts, closeFavs } from "../../redux/actions";
import s from './FavouriteProds.module.css';
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

export default function FavouriteProducts({showFavs}){
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.general);

  useEffect(()=>{
    dispatch(getFavouritesProducts(user.user.id));
  }, [dispatch])

  const { favouritesProducts } = useSelector((state) => state.general);

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


const handleCloseFavourites = (e) => {
  e.preventDefault();
  dispatch(closeFavs())
};

const handleRemoveFromFavs = (e) => {
  e.preventDefault();
  let idUser = user.user.id;
  const id = favouritesProducts ? (favouritesProducts?.favorites.filter((el) => el.idUser === idUser))[0].id : '';
  dispatch(removeFavourite(id));
};

const handleCloseSuccessComment = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpenComment(false);
  setOpenLogin(false);
};


  return (
    <div>
      <div className={s.containerFavs}>
      <Dialog
        open={showFavs}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseFavourites}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"MY FAVOURITES"}</DialogTitle>
        <DialogContent>
        <hr/>
          <DialogContentText id="alert-dialog-slide-description">
            
            
          <div className={s.secondaryContainer}>
         {favouritesProducts?.length === 0 
                 ? <p>You have no favourite products</p>
                 : favouritesProducts?.map((e) => {
                     return (
                     <div className={s.favsMainblock}>
                        <img className={s.favsImage} src={e?.image} alt={e?.name} />
                        <div className={s.favsName}>
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
         <DialogActions>
                      <Button className={s.viewMore} onClick={handleCloseFavourites}>View More</Button>
          </DialogActions>
       </Dialog>
                 
                <div>
                
            </div>
        </div>
    </div>
  );
};