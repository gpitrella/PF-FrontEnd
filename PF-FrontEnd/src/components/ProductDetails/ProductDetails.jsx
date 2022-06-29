import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails, addProductToCart, postCommentProduct } from "../../redux/actions";
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.homepage.productDetails)
    const productsCart = useSelector((state) => state.general.productsCart)
    const commentCreated = useSelector((state) => state.general.commentCreated)
    let discountPrice = Math.round(productDetails.price - productDetails.price * (productDetails.discount / 100));
    
    React.useEffect(() => {
        dispatch(getProductDetails(id));
      //  return() => {
      //      dispatch(clearGameDetail())
      //  }
    }, [commentCreated]);

    // Configuración boton agregar comentario.
    const [openComment, setOpenComment] = React.useState(false);
    const [openSuccessAddToCart, setOpenSuccessAddToCart] = React.useState(false);
    const [openProductInCart, setProductInCart] = React.useState(false);
    
    const [comment, setComment] = React.useState();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleComment = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    };
    const handleSend = () => {
        // product.comment.push(comment);
        dispatch(postCommentProduct(comment, productDetails.id));
        handleClickComment()
        handleClose();
    };
    const addtoCart = () => {
        console.log(productsCart)
        const productInCart = productsCart?.filter(product => product.id === productDetails?.id)
        if(productInCart?.length === 0){
            dispatch(addProductToCart(productDetails.id));
            setOpenSuccessAddToCart(true)
            console.log('producto agregado al carrito')        
        } else {
            handleOpenProductInCart();
        }
    };
    
    const handleClickComment = () => {
        setOpenComment(true);
    };

    const handleOpenProductInCart = () => {
        setProductInCart(true);
    };

    const handleCloseSuccessComment = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenComment(false);
        setOpenSuccessAddToCart(false);
        setProductInCart(false);
    };
    
  

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
                </div>
                <div>
                    <p id="product_category"><strong>Category: </strong>{productDetails?.categories ? productDetails.categories[0] : 'WithOut Categories'}</p>
                    <h3 id="title_product">{productDetails?.name}</h3>
                    <hr/>
                    <div className="price_rating">
                        <div>
                            <span id="product_price_discount" > ${productDetails.discount !== 0 ? discountPrice : productDetails.price} </span>
                            <span id="product_price"> ${productDetails?.price} </span>
                            <p id="product_seller">Brand: <strong>{productDetails?.manufacturers ? productDetails.manufacturers[0]?.name : 'WithOut Brand'}</strong></p>
                        </div>
                        <div id="review_block">
                            <p id="review_detail">Reviews:</p>
                            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        </div>
                    </div>
                    
                    <hr/>

                    <h4 className="mt-2">Description:</h4>
                    <p>{productDetails?.description}</p>
                    <hr/>

                    <Stack spacing={2} direction="row">
                        <span>Stock: <span id="stock_status">{productDetails?.stock} unid.</span></span>
                        <Button className='btn_Product_Detail' size="small" variant="contained" onClick={addtoCart}>Add to Cart</Button>
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
                        <span><strong> QUESTIONS TO SELLER: </strong></span>
                    </div>
                    <div id="review_comment">
                        <div>
                            <div id="review_block">
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Write a Question
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Question:</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText>
                                        Write a query about this product, we will answer you shortly.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="comment"
                                        label="Write here your question ..."
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
                    {(productDetails.comments?.length === 0)
                        ? <p>This product has no comments.</p>
                        : productDetails.comments?.map((element) => {
                            return(<div key={parseInt(Math.random() * 10000 / Math.random())}><p> - {element.comment.charAt(0) + element.comment.slice(1, element.comment.length).toLowerCase()}</p></div>)
                        })}
                </div>
                <Snackbar open={openComment} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                    <Alert onClose={handleCloseSuccessComment} severity="success" sx={{ width: '100%' }}>
                        Success comment created!
                    </Alert>
                </Snackbar>
                <Snackbar open={openSuccessAddToCart} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                    <Alert onClose={handleCloseSuccessComment} severity="success" sx={{ width: '100%' }}>
                        Product Added to Cart!
                    </Alert>
                </Snackbar>
                <Snackbar open={openProductInCart} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                    <Alert onClose={handleCloseSuccessComment} severity="info" sx={{ width: '100%' }}>
                        The product has already been added to the cart!
                    </Alert>
                </Snackbar>
            </div>
        </div>
        )    
}