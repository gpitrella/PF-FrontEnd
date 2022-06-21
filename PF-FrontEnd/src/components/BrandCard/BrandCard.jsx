import './BrandCard.css'
import AMD from './img/AMD.png'
const { Link } = require("react-router-dom")


const BrandCard = ({name})=> {
    return(
        <div className="imagebrandcontainer">
            <Link to="" > <img className="brandimage" src={AMD} alt="IMG" /> </Link>
        </div>
    )
}

export default BrandCard;