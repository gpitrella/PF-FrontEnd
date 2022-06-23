//import Carousel from "react-multi-carousel";
import BlackFriday from '../../assets/black_friday.jpg'
import Notebook from '../../assets/macbook.png'
import Monitor from '../../assets/samsung_monitor.jpg'
import 'react-multi-carousel/lib/styles.css'
import s from './Ads.module.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Ads = ()=> {
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 2000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 2000, min: 1300 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1300, min: 900 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 900, min: 0 },
          items: 1
        }
      };
    return(
        <div className={s.container} >
        <Carousel autoPlay={true} centerMode={true} centerSlidePercentage={100}  >
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
