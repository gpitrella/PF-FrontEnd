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
import question from './img/question.gif';
import './MyProfile.css'
import { Link } from 'react-router-dom';

export default function MyProfile() {
  return (
    <div>
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
          <Link to='/myprofile/personalinformation'>
            <Button size="small" color="primary">
                My Personal Information
            </Button>
          </Link>
        </CardActions>
      </Card>

      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <Link to='/myprofile/mypurchases'>
            <CardMedia
              component="img"
              height='130'
              width="50"
              image={my_orders}
              alt="my orders"
            />
          </Link>
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Link to='/myprofile/mypurchases'>
            <Button size="small" color="primary">
              My Purchases
            </Button>
          </Link>
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
          <Link to='/myprofile/myaddress'>
            <CardMedia className='personal_informacion'
              component="img"
              height='130'
              width="50"
              image={my_address}
              alt="my address"
            />
          </Link>
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Link to='/myprofile/myaddress'>
            <Button size="small" color="primary">
              My Address
            </Button>
          </Link>
        </CardActions>
      </Card>
      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <Link to='/myprofile/myreviews'>
            <CardMedia className='personal_myreview'
              component="img"
              height='130'
              width="50"
              image={review_animation}
              alt="my reviews"
            />
          </Link>

        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Link to='/myprofile/myreviews'>
            <Button size="small" color="primary">
              My Reviews
            </Button>
          </Link>
        </CardActions>
      </Card>

      <Card sx={{ width: 200, height: 200 }}>
        <CardActionArea>
          <Link to='/myprofile/mycomments'>
            <CardMedia className='personal_informacion'
              component="img"
              height='130'
              width="50"
              image={question}
              alt="my address"
            />
          </Link>
        </CardActionArea>
        <CardActions className='button_myprofile'>
          <Link to='/myprofile/mycomments'>
            <Button size="small" color="primary">
              My Questions
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
    </div>
  );
}
