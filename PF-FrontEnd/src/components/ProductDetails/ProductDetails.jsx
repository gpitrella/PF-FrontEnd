import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getGameDetail, clearGameDetail } from "../../redux/actions";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import './ProductDetails.css';

export const product = 
    {
        "id": 1,
        "name": "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
        "price": 10995,
        "description": "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
        "image": "https://www.mastecnologia.com.ar/images/productos/90411.png",
        "category": "Notebook",
        "discount": 10,
        "stock": 35
      }

export default function ProductDetails (){


    // const dispatch = useDispatch();
    //const { idProduct } = useParams();
    // const gameDetail = useSelector((state) => state.gameDetail)
    
    //React.useEffect(() => {
        // dispatch(getGameDetail(idVideogame));
      //  return() => {
      //      dispatch(clearGameDetail())
      //  }
    //}, [dispatch, idProduct]);
    
    
        return (
        <div className="mainProduct">
            <div className="mainProductDetail">
                <div id="product_image">
                    <img src={product.image} alt={product.name} height="400" width="500"/>
                </div>

                <div>
                    
                    <p id="product_category">Categoria: {product.category}</p>
                    <h3 id="title_product">{product.name}</h3>
                    <hr/>
                    <div className="price_rating">
                        <div>
                            <span id="product_price_discount"> $100.00 </span>
                            <span id="product_price" > $108.00 </span>
                            <p id="product_seller">Marca: <strong>Intel</strong></p>
                        </div>
                        <div id="review_block">
                            <p id="review_detail">Reviews:</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                    </div>
                    
                    <hr/>

                    <h4 className="mt-2">Descripción:</h4>
                    <p>{product.description}</p>
                    <hr/>

                    <Stack spacing={2} direction="row">
                        <p>Status: <span id="stock_status">In Stock</span></p>
                        <Button className='btn_Product_Detail' size="small" variant="contained">Add to Cart</Button>
                        <Button className='btn_Product_Detail' size="small" variant="contained">Buy</Button>
                    </Stack>                    
                    <hr/>

                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    
                </div>
            </div>
            <div className="mainProductDetail">
                <span id="no_of_reviews"><strong>TAGS:</strong> - Intel - Nootbook - Procesador AMD </span>
                <hr/>
            </div>
            
            <div className="comment_add">
                <div>
                    <span> COMENTARIOS: </span>
                </div>
                <div id="review_block">
                    <Button className='btn_Product_Detail' size="small" variant="outlined">Add Comment</Button>
                </div>
            </div>
        </div>
        )
    
}