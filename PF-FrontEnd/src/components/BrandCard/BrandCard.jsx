import './BrandCard.css'
import { useHistory } from 'react-router-dom'

const BrandCard = ({name,image})=> {

    const history = useHistory()

    const handdleClick = (e)=>{
        e.preventDefault()
        history.push('/store')
    }

    return(
        <div className="imagebrandcontainer">
            <button className='brandBtn' name={name} onClick={(e)=>handdleClick(e)}>
            <img className="brandimage" src={image} alt={name} />
            </button>
        </div>
    )
}

export default BrandCard;
