import * as React from 'react';
import List from '@mui/material/List';
import { useSelector } from "react-redux";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './PersonalInformation.css'

export default function PersonalInformation() {
  const { oneuser } = useSelector((state) => state.userReducer)
  return (
    <div className='main_box_personalinformation'>
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
