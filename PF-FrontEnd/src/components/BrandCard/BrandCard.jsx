import './BrandCard.css'

const BrandCard = ({name,image})=> {

    const handdleClick = (e)=>{
        e.preventDefault()
        alert(`Go to ${e.target.name}`)
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
