import './Brands.css'
import BrandCard from '../BrandCard/BrandCard'
const { useSelector } = require("react-redux")

const b = [{name:"intel"},{name:"AMD"},{name:"apple"}]

const Brands = ()=> {

  return(
    <div className='brandscontainer'>
      {
        b&&b.map( b=>
          <BrandCard name={b.name} />
        )
      }
    </div>

  )
}

export default Brands;