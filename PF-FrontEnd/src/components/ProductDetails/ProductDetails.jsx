import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../redux/actions/homepageActions";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import ImageLoader from '../ImageLoader/ImageLoader';
import './ProductDetails.css';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const product = 
    {
        "id": 1,
        "name": "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
        "price": 10995,
        "description": "LENOVO V14-ADA | PROCESADOR AMD ATHLON 3020E | RAM 4GB | SSD 256GB | PANTALLA 14 | FREE SO | TECLADO ES",
        "image": "https://www.mastecnologia.com.ar/images/productos/90411.png",
        "category": "Notebook",
        "discount": 10,
        "stock": 35,
        "comment": []
      }

export default function ProductDetails (){
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.homepage.productDetails)
    let discountPrice = Math.round(productDetails.price - productDetails.price * (productDetails.discount / 100));
    
    React.useEffect(() => {
        dispatch(getProductDetails(id));
      //  return() => {
      //      dispatch(clearGameDetail())
      //  }
    }, [dispatch, id]);

    // Configuración boton agregar comentario.
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleComment = (e) => {
        e.preventDefault();
        setComment(e.target.value)
    }
    const handleSend = () => {
        product.comment.push(comment);
        handleClose();
    }
    console.log(productDetails)
  

        return (
        <div className="mainProduct">
            <div className="mainProductDetail">
                <div id="product_image">
                    {
                        productDetails.discount !== 0 &&
                        <div className = 'containerDiscount'>
                        {productDetails.discount}% OFF
                        </div>
                    }
                    <ImageLoader image = {productDetails?.image} alt = {productDetails?.name} />
                    {/* <img id="detail_image" src={productDetails?.image} alt={product.name}/> */}
                    
                </div>
                <div>
                    <p id="product_category"><strong>Category: </strong>{productDetails?.categories ? productDetails.categories[0] : 'WithOut Categories'}</p>
                    <h3 id="title_product">{productDetails?.name}</h3>
                    <hr/>
                    <div className="price_rating">
                        <div>
                            <span id="product_price_discount"> ${productDetails?.price} </span>
                            <span id="product_price" > ${productDetails.discount !== 0 ? discountPrice : productDetails.price} </span>
                            <p id="product_seller">Brand: <strong>{productDetails?.manufacturers ? productDetails.manufacturers[0]?.name : 'WithOut Brand'}</strong></p>
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
                        <span>Stock: <span id="stock_status">{productDetails?.stock} unid.</span></span>
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
            <div className="comment_main">
                <div className="comment_add">
                    <div>
                        <span><strong> COMENTARIOS: </strong></span>
                    </div>
                    <div id="review_comment">
                        <div>
                            <div id="review_block">
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Escribir Comentario
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Comentario:</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Escribe un comentario del producto que compraste, esto ayudara a futuros compradores a elegir el producto más apropiado.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="comment"
                                        label="Escribe aqui tu comentario ..."
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e)=> handleComment(e)}
                                    />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancelar</Button>
                                        <Button onClick={handleSend}>Enviar</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(product.comment.length === 0)
                        ? <p>Este producto no tiene comentarios</p>
                        : product.comment.map((element) => {
                            return(<div><p> - {element}</p></div>)
                        })}
                </div>
            </div>
        </div>
        )
    
}