import React from 'react'
import BlackFriday from '../../assets/black_friday.jpg'
import Notebook from '../../assets/macbook.png'
import Monitor from '../../assets/samsung_monitor.jpg'
import 'react-multi-carousel/lib/styles.css'
import s from './Ads.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Ads = ()=> {
   
    return(
        <div className='brandscontainer' >
        <Carousel  infiniteLoop = {true} autoPlay={true} autoPlaySpeed={5000} removeArrowOnDeviceType={["tablet", "mobile"]} swipeable={true}
                draggable={true} showStatus={false} showThumbs={false} showArrows={true} >
          <div className={s.items}>
            <img src={BlackFriday} alt="BlackFriday" />
          </div>
          <div className={s.items}>
            <img src={Notebook} alt="Back" />
          </div>
          <div className={s.items}>
            <img src={Monitor} alt="Logo" />
          </div>
        </Carousel>
      </div>
    )
}

export default Ads;
