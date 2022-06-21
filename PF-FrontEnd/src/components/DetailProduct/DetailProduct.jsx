import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import { getGameDetail, clearGameDetail } from "../../redux/actions";
import './DetailProduct.css';

export function ProductDetail (){

    const products = [
        {
          "id": 1,
          "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
          "price": 109.95,
          "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
          "rating": {
            "rate": 3.9,
            "count": 120
          }
        },
        {
          "id": 2,
          "title": "Mens Casual Premium Slim Fit T-Shirts ",
          "price": 22.3,
          "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          "category": "men's clothing",
          "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          "rating": {
            "rate": 4.1,
            "count": 259
          }
        }]

    const dispatch = useDispatch();
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
                {game.game.name ?
                        <div>
                        <h1 className={style.titleDetail}> ✅ GAME CREATED SUCCEFULLY 🎮</h1>
                        <h3 className={style.titleDetail}> ⭕️ {game.game.name}</h3>
                        <div className={style.cardDetail}>
                            <img className={style.imageDetail} src={game.game.image} alt={game.game.name} />
                            <span className={style.descriptionDetailTitle}> Details: 
                                <p className={style.dateReleased}> 🌀 Released Date: {game.game.released}</p>
                                <p className={style.dateReleased}> 🌀 Rating: ⭐️ {game.game.rating}</p>
                                <div className={style.genresPlatforms}>
                                    <span className={style.genreDetail}> 🌀 Genres: 
                                        <span>{game.game.genres?.map(genre =>(
                                            <span className={style.dateGenre} key={Math.random()*1000/8*3}> {genre}</span>
                                        ))}</span>
                                    </span>
                                    <span className={style.platformDetail}> 🌀 Platforms: 
                                        <span>{game.game.platforms?.map(p =>(
                                            <span className={style.dateGenre} key={Math.random()*1000/8*3}> {p.platform.name}</span>
                                        ))}</span> 
                                    </span>                            
                                </div>
                            </span>
                        </div>
                            <span className={style.description}>
                                <p className={style.descriptionTitle}>Description: </p>
                                <br></br>
                                {game.game.description}
                            </span>
                    </div>
                    : (<h2 className={style.charging}> 👁‍🗨 Charging ... </h2>)
                }
            </div>
        )
    } else {
        return (
            <div className={style.bodyDetail}>                
                {gameDetail.name ?
                    <div>
                        <h3 className={style.titleDetail}>⭕️ {gameDetail.name}</h3>
                        <div className={style.cardDetail}>
                            <img className={style.imageDetail} src={gameDetail.image} alt={gameDetail.name} />
                            <span className={style.descriptionDetailTitle}> Details: 
                                <p className={style.dateReleased}> 🌀 Released Date: {gameDetail.released}</p>
                                <p className={style.dateReleased}> 🌀 Rating: ⭐️ {gameDetail.rating}</p>
                                <div className={style.genresPlatforms}>
                                    <span className={style.genreDetail}> 🌀 Genres: 
                                        <span>{gameDetail.genres?.map(genre =>(
                                            <span className={style.dateGenre} key={gameDetail.id*Math.random()*1000/8}> {genre.name}</span>
                                        ))}</span>
                                    </span>
                                    <span className={style.platformDetail}> 🌀 Platforms: 
                                        <span>{gameDetail.platforms?.map(p =>(
                                            <span className={style.dateGenre} key={gameDetail.id*Math.random()*1000/8}> {p.platform.name}</span>
                                        ))}</span> 
                                    </span>                            
                                </div>
                            </span>
                        </div>
                            <span className={style.description}>
                                <p className={style.descriptionTitle}>Description: </p>
                                <br></br>
                                {gameDetail.description.replaceAll('<p>','').replaceAll('<br>','').replaceAll('<br />','').replaceAll('</p>','')}
                            </span>
                    </div>
                    : (<h2 className={style.charging}> 👁‍🗨 Charging ... </h2>)
                }
            </div>
        )

    }
}

export default GameDetail;