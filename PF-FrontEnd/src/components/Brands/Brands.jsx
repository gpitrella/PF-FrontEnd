import './Brands.css'
import BrandCard from '../BrandCard/BrandCard'
import Carousel from 'react-multi-carousel'
const { useSelector } = require("react-redux")

const b = [{name:"intel"},{name:"AMD"},{name:"apple"}]

const Brands = ()=> {

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
    },
    xsmall: {
      breakpoint: { max: 780, min: 0 },
      items: 4
    },
    xxsmall: {
      breakpoint: { max: 640, min: 0 },
      items: 3
    },
    xxxsmall: {
      breakpoint: { max: 480, min: 0 },
      items: 2
    }
  };

  let data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return(
    <div className='brandscontainer'>
      <Carousel responsive = {responsive} infinite = {true}>
        {
          data && data.map((product, index) => 
            <BrandCard key={index}/>
          )
        }
      </Carousel>
    </div>

)
}

export default Brands;

/*
{
  b&&b.map( b=>
    <BrandCard name={b.name} />
  )
}*/