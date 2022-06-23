import Carousel from "react-multi-carousel";
import BlackFriday from '../../assets/black_friday.jpg'
import Back from '../../assets/background_ads.jpg'
import Logo from '../../assets/logo_cyber_monday.png'
import 'react-multi-carousel/lib/styles.css'
import s from './Ads.module.css'

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
        <div className='brandscontainer' >
        <Carousel responsive = {responsive} infinite = {true} autoPlay={true} autoPlaySpeed={5000} removeArrowOnDeviceType={["tablet", "mobile"]} swipeable={true}
                draggable={true} >
          <div className={s.items}>
            <img src={BlackFriday} alt="BlackFriday" />
          </div>
          <div className={s.items}>
            <img src={Back} alt="Back" />
          </div>
          <div className={s.items}>
            <img src={Logo} alt="Logo" />
          </div>
        </Carousel>
      </div>
    )
}

export default Ads;
