import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import my_orders from './img/my_orders.gif';
import person from './img/profile_blue.gif';
import my_favourites from './img/favorite_heart.gif';
import my_address from './img/home.gif';
import review_animation from './img/review_animation.gif';
import './MyProfile.css'
import { Link } from 'react-router-dom';

export default function MyProfile() {
  return (
    <div>
    <h2 className='title_myprofile'> My account </h2>
    <div className='main_box_pyProfile'>
      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea >
          <Link to='/myprofile/personalinformation'>
            <CardMedia className='personal_informacion'
              component="img"
              height="130"
              width="50"
              image={person}
              alt="personal information"
            />
          </Link>
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Button size="small" color="primary">
              My Personal Information
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height='130'
            width="50"
            image={my_orders}
            alt="my orders"
          />
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Button size="small" color="primary">
            My Orders
          </Button>
        </CardActions>
      </Card>
  
      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <CardMedia className='personal_informacion'
            component="img"
            height='130'
            width="50"
            image={my_favourites}
            alt="my favourites"
          />
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Button size="small" color="primary">
             My Favourites
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <CardMedia className='personal_informacion'
            component="img"
            height='130'
            width="50"
            image={my_address}
            alt="my address"
          />
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Button size="small" color="primary">
            My Address
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <CardMedia className='personal_myreview'
            component="img"
            height='130'
            width="50"
            image={review_animation}
            alt="my reviews"
          />
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Button size="small" color="primary">
            My Reviews
          </Button>
        </CardActions>
      </Card>
    </div>
    </div>
  );
}
