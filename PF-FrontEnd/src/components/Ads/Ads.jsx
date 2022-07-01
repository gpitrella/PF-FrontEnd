import React from 'react'
import BlackFriday from '../../assets/black_friday.jpg'
import Notebook from '../../assets/macbook.png'
import Monitor from '../../assets/samsung_monitor.jpg'
import 'react-multi-carousel/lib/styles.css'
import s from './Ads.module.css'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Ads = ()=> {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 2000 },
      items: 15
    },
    desktop: {
      breakpoint: { max: 2000, min: 1300 },
      items: 8
    },
    tablet: {
      breakpoint: { max: 1300, min: 900 },
      items: 6
    },
    mobile: {
      breakpoint: { max: 900, min: 0 },
      items: 5
    }
  };
   
    return(
        <div className={s.ads} >
        <Carousel responsive = {responsive} infinite = {true} autoPlay={true} autoPlaySpeed={5000} removeArrowOnDeviceType={["tablet", "mobile"]} swipeable={true}
                draggable={true} showStatus={false}>
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
