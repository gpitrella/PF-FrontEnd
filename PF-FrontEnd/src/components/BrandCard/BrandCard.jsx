import './BrandCard.css';
import { Link } from 'react-router-dom';

const BrandCard = ({name,image})=> {

    

    const handdleClick = (e)=>{
        e.preventDefault()
        //alert(`Go to ${e.target.name}`)
    }

    return(
        <div className="imagebrandcontainer">
            <Link to = {`store/brand/${name}`}>
            <button className='brandBtn' name={name}>
            <img className="brandimage" src={image} alt={name} />
            </button>
            </Link>
        </div>
    )
}

export default BrandCard;
