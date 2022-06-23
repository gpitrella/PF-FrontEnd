import React from 'react'
import BlackFriday from '../../assets/black_friday.jpg'
import Back from '../../assets/background_ads.jpg'
import Logo from '../../assets/logo_cyber_monday.png'
import 'react-multi-carousel/lib/styles.css'
import s from './Ads.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Ads = ()=> {
   
    return(
        <div className="carousel-wrapper">
          <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} >
            <div>
              <img src={BlackFriday} alt="BlackFriday" />
            </div>
            <div>
              <img src={BlackFriday} alt="Back" />
            </div>
            <div>
              <img src={BlackFriday} alt="Logo" />
            </div>
          </Carousel>
        </div>
    
    )
}

export default Ads;
