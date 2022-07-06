import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetail } from '../../../redux/actions'
import './PersonalInformation.css'

export default function PersonalInformation() {
    const { user } = useSelector((state) => state.general);
    const { oneuser } =useSelector((state) => state.userReducer)
    const dispatch = useDispatch();
    console.log(user)

    React.useEffect(() => {
        if(user?.user) {
            dispatch(getUserDetail(user?.user.id))
        }
    }, [user]);

  return (
    <div className='main_box_personalinformation'>
    <h2 className='title_myprofile'> My account </h2>
    <h3 className='title_personalinformation'> Personal Information </h3>
    <List className='box_main_personal' sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`Name: ${oneuser?.name}`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <EmailIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`E-mail: ${oneuser?.email}`} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <KeyIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Password: ******" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HomeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Address: Av. SiempreViva 300" />
      </ListItem>
    </List>
    <Link to={`/myprofile`}>
        <Button id='btn_personalinformation' variant="contained"> My Profile </Button>
    </Link>
    </div>
  );
}
