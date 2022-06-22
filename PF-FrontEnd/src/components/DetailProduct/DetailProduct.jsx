import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getGameDetail, clearGameDetail } from "../../redux/actions";
import './DetailProduct.css';

export function ProductDetail (){

    const products = [
        {
            "id": 1,
            "name": "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
            "price": 109950,
            "description": "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
            "image": "https://www.mastecnologia.com.ar/images/productos/90411.png",
            "discount": 10,
            "stock": 35
          }]

    // const dispatch = useDispatch();
    //const { idProduct } = useParams();
    // const gameDetail = useSelector((state) => state.gameDetail)
    
    //React.useEffect(() => {
        // dispatch(getGameDetail(idVideogame));
      //  return() => {
      //      dispatch(clearGameDetail())
      //  }
    //}, [dispatch, idProduct]);
    
    if(products){
        return (
            <div className="bodyDetail">
                <div>
                    <img className='imageDetail' src={products[0].image} alt={products[0].title} />
                </div>
                <div>
                    <h3 className='titleDetail'>{products[0].title}</h3>
                </div>
            </div>



            // <div className="bodyDetail">
            //     {products[1] ?
            //             <div>
            //             <h1 className={style.titleDetail}> ✅ GAME CREATED SUCCEFULLY 🎮</h1>
            //             <h3 className={style.titleDetail}> ⭕️ {game.game.name}</h3>
            //             <div className={style.cardDetail}>
            //                 <img className={style.imageDetail} src={game.game.image} alt={game.game.name} />
            //                 <span className={style.descriptionDetailTitle}> Details: 
            //                     <p className={style.dateReleased}> 🌀 Released Date: {game.game.released}</p>
            //                     <p className={style.dateReleased}> 🌀 Rating: ⭐️ {game.game.rating}</p>
            //                     <div className={style.genresPlatforms}>
            //                         <span className={style.genreDetail}> 🌀 Genres: 
            //                             <span>{game.game.genres?.map(genre =>(
            //                                 <span className={style.dateGenre} key={Math.random()*1000/8*3}> {genre}</span>
            //                             ))}</span>
            //                         </span>
            //                         <span className={style.platformDetail}> 🌀 Platforms: 
            //                             <span>{game.game.platforms?.map(p =>(
            //                                 <span className={style.dateGenre} key={Math.random()*1000/8*3}> {p.platform.name}</span>
            //                             ))}</span> 
            //                         </span>                            
            //                     </div>
            //                 </span>
            //             </div>
            //                 <span className={style.description}>
            //                     <p className={style.descriptionTitle}>Description: </p>
            //                     <br></br>
            //                     {game.game.description}
            //                 </span>
            //         </div>
            //         : (<h2 className={style.charging}> 👁‍🗨 Charging ... </h2>)
            //     }
            // </div>
        )
    } 
}

export default ProductDetail;