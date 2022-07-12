import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { removeFavourite, getFavouritesProducts, closeFavs, favoritesCharged, removeFavoritesCharged } from "../../redux/actions";
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
import IconButton from '@mui/material/IconButton';

//LIST
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import { Avatar } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });


export default function FavouriteProducts({showFavs}){
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, favoritiesCharged } = useSelector((state) => state.general);
  const [favouritesUpdated, setFavouritesUpdated] = useState(false);
  const { favouritesProducts, newFavoriteProduct } = useSelector((state) => state.general);

  useEffect(()=>{
    if(user?.user && !favoritiesCharged) {
      dispatch(getFavouritesProducts(user?.user?.id));
      dispatch(favoritesCharged());
      // setFavouritesUpdated(false);
    }
  }, [newFavoriteProduct]);

  //LIST:

const handleCloseFavourites = (e) => {
  // e.preventDefault();
  dispatch(closeFavs());
};

const handleRemoveFromFavs = (e) => {
  dispatch(removeFavoritesCharged())
  let idProduct = e;
  let idUser = user.user.id;
  const alreadyFavourite = favouritesProducts?.find(product => product.id === idProduct);
  const id = alreadyFavourite ? (alreadyFavourite?.favorites.filter((el) => el.idUser === idUser))[0].id : '';
  dispatch(removeFavourite({ id }))
  setFavouritesUpdated(true);
};

// useEffect(()=>{
//   if(user?.user){
//     dispatch(getFavouritesProducts(user.user.id));
//     setFavouritesUpdated(false);
//   }
// }, []);

const handleClick = (id) => {
  history.push(`/productdetails/${id}`);
  dispatch(closeFavs());
};


  return (
    <div >
      <div >
      <Dialog
        open={showFavs}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleCloseFavourites()}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ color: "var(--fontColor)", justifyContent: "center", }}>{"MY WISH-LIST"}</DialogTitle>
        <DialogContent>
        <hr/>
          <DialogContentText id="alert-dialog-slide-description">            
          <div className={s.secondaryContainer}>
         {favouritesProducts?.length === 0 
                 ? <p>You have no favourite product...</p>
                 : <List dense sx={{ width: '100%', maxWidth:600, bgcolor: 'var(--primaryColor)' }}>
                 {favouritesProducts?.map((e) => {
                     const labelId = `checkbox-list-primary-label-${e?.id}`;
                     return (
                      <div className={`${s.containerFavs}${s.favsMainblock}`}>
                      <ListItem
                        key={e?.id}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromFavs(e?.id)}>
                            <DeleteForeverIcon />
                          </IconButton>
                        }
                        disablePadding
                        >

                          {/* <ListItemButton role={undefined} onClick={(e)=>handleToggle(e?.id)} dense>
                            <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(e.id) !== -1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId}}
                            />
                            </ListItemIcon>
                            </ListItemButton> */}
                            <ListItemButton onClick={()=>handleClick(e?.id)} dense >

                            <ListItemAvatar className={s.favsImg} >
                              <Avatar 
                                src={e.image}
                                alt={e.name}
                                sx={{ maxWidth: 100, height: "auto", objectFit: "scale-down", overflow: "visible" }}
                                variant="square" />
                            </ListItemAvatar>
                            <ListItemText 
                            className={s.favsName}
                            id={labelId}
                            primary={e?.name}
                            secondary={`Price: $ ${e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price} `} />
                          </ListItemButton>
                        </ListItem>
                        <Divider variant="inset" component="li" />

                        </div>
                 )})}
                   </List>
                  }
                </div>
            </DialogContentText>
         </DialogContent>
         <DialogActions sx={{ display: "flex", justifyContent: "end", alignItems: "center", mr: 8, fontWeight: 700,}}>
                      <Button onClick={(e)=>handleCloseFavourites(e)}>View More</Button>
          </DialogActions>
       </Dialog>
                 
                <div>
                
            </div>
        </div>
    </div>
  );
};