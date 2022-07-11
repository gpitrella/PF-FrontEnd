import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import SignpostIcon from '@mui/icons-material/Signpost';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteUserAddress, getUserDetail } from '../../../redux/actions';
import './MyAddress.css'

// Alerta comentario creado
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function MyAddress() {
  const [openComment, setOpenComment] = React.useState(false);
  const { oneuser } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log(id)
    console.log('entre a delete address')
    dispatch(deleteUserAddress(id));
    setOpenComment(true) 
  };

  const handleCloseSuccessComment = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenComment(false);
  };


  React.useEffect(() => {
    dispatch(getUserDetail(oneuser.id))
  }, [openComment]);
    
  return (
    <div className='main_box_personalinformation'>
    <h3 className='title_personalinformation'> My Address </h3>
    <div className='variation_myaddress'>
      {oneuser.useraddresses.length === 0 
        ? <h3 className='title_myaddress_profile'> Don't have address register yet.</h3>
        : oneuser.useraddresses.map((address) => {
        return (
        <div className='individual_myaddress' key={address.id}>
          <List className='box_main_myaddress' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SignpostIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Street: ${address?.street}`} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AddRoadIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`Street Height: ${address?.street_height}`} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocationCityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`City: ${address?.city}`} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MarkunreadMailboxIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={`CP: ${address?.zipcode}`} />
            </ListItem>

          <Stack spacing={2} direction="row" display={"flex"} justifyContent={"center"}>
            <Button variant="outlined" onClick={() => handleDelete(address.id)} size="small"> Delete </Button>
          </Stack>
          </List>

        </div>)
        })}
      </div>
        <Link to={`/myprofile`}>
            <Button id='btn_personalinformation' variant="contained"> My Profile </Button>
        </Link>
        <Snackbar open={openComment} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
            <Alert onClose={handleCloseSuccessComment} severity="success" sx={{ width: '100%' }}>
                Success Address Deleted!
            </Alert>
        </Snackbar>
    </div>
  );
}
