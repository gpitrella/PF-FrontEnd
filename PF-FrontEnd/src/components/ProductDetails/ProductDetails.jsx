import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getProductDetails, addProductToCart, postCommentProduct } from "../../redux/actions";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import style from './ProductDetails.module.css';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Loading from '../SVG/Loading';
import SectionCatalogue from '../SectionCatalogue/SectionCatalogue';
import { chooseRandom } from '../../util';
import { 
    showLoadingSectionOne,
    showLoadingSectionTwo,
    showLoadingSectionThree,
    getProductsToSectionOne,
    getProductsToSectionTwo,
    getProductsToSectionThree,
    resetSections
  } from '../../redux/actions';

// Alerta comentario creado
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Box desplegable para login
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };



export default function ProductDetails (){
    const [open, setOpen] = React.useState(false); // Box de comentarios
    const dispatch = useDispatch();
    const { id } = useParams();
    const productDetails = useSelector((state) => state.homepage.productDetails)
    const productsCart = useSelector((state) => state.general.productsCart)
    const commentCreated = useSelector((state) => state.general.commentCreated)
    const reviewCreated = useSelector((state) => state.general.reviewCreated)
    const { user } = useSelector((state) => state.general)
    const { section, allCategories, brandsList } = useSelector(state => state.homepage);
    const [ chooseSection, setChooseSection ] = React.useState({
        two: '',
        three: '',
        show: false
    });
    let discountPrice = Math.round(productDetails.price - productDetails.price * (productDetails.discount / 100));
    
    React.useEffect(() => {
        dispatch(getProductDetails(id));
    }, [commentCreated, reviewCreated, id]);

    // Cartel desplegable de Login
    const [openLogin, setOpenLogin] = React.useState(false);

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };
  
    const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    const handleOpenPageLogin = () => {
        history.push('/login');
    }

    // Configuración boton agregar comentario.
    const [openComment, setOpenComment] = React.useState(false);
    const [openSuccessAddToCart, setOpenSuccessAddToCart] = React.useState(false);
    const [openProductInCart, setOpenProductInCart] = React.useState(false);
    const [openWithOutStock, setOpenWithOutStock] = React.useState(false)
    const history = useHistory();
    const [comment, setComment] = React.useState(); // Box de comentarios
    const [commentReview, setCommentReview] = React.useState();
    const [ loadingSections, setLoadingSections ] = React.useState(false);

    const handleClickOpen = () => {
        if(!user?.user){
            handleClickOpenLogin();
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleComment = (e) => {
        e.preventDefault();
        setComment(e.target.value);
    };

    const handleSend = () => {
        if(!user?.user){
            handleClickOpenLogin();
        } else {
            console.log('entre a comentarios')
            dispatch(postCommentProduct(comment, productDetails?.id, user?.user.id));
            handleClickComment()
            handleClose();
        }
    };

    let score = 0;
    const reducer = (accumulator, curr) => accumulator + curr;
    const sumaryScore = () => {
        const sumary = [];
        if(productDetails?.reviews?.length > 0){
            productDetails?.reviews?.map((element)=>{
                sumary.push(element.score)
            })
            score = sumary.reduce(reducer) / sumary.length;
        }
    };
    sumaryScore();

    // Adherir al Carrito
    const addtoCart = () => {
        const productInCart = productsCart?.filter(product => product.id === productDetails?.id)
        if(productInCart?.length === 0 && productDetails?.stock > 0){
            dispatch(addProductToCart(productDetails.id));
            setOpenSuccessAddToCart(true)
        } 
        if(productInCart?.length > 0 && productDetails?.stock === 0){
            handleOpenWithOutStock();
        }
        if(productInCart?.length > 0 && productDetails?.stock > 0) {
            handleOpenProductInCart();
        }
    };

    const addtoCartandCheckOut = (e) => {
        e.preventDefault();
        const productInCart = productsCart?.filter(product => product.id === productDetails?.id)
        if(productInCart?.length === 0 && productDetails?.stock > 0){
            dispatch(addProductToCart(productDetails.id));
            history.push('/checkout');
        } else {
            history.push('/checkout');
        }
    };

    const handleOpenWithOutStock = () => {
        setOpenWithOutStock(true);
    };
    
    const handleClickComment = () => {
        setOpenComment(true);
    };

    const handleOpenProductInCart = () => {
        setOpenProductInCart(true);
    };

    const handleCloseSuccessComment = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenComment(false);
        setOpenSuccessAddToCart(false);
        setOpenProductInCart(false);
        handleCloseLogin();
        setOpenWithOutStock(false);
    };

    React.useEffect(() => {
        // dispatch(showLoadingSectionOne());
        dispatch(showLoadingSectionTwo());
        // dispatch(showLoadingSectionThree());
        if (allCategories.length > 0 && brandsList.length > 0 && !loadingSections) { 
            setLoadingSections(true);
        }
        getRandomLists();
        setLoadingSections(false);
        
        return () => {
          dispatch(resetSections());
          setChooseSection({
            two: '',
            three: '',
            show: false
          });
          setLoadingSections(false);
        }
      }, [id]);

    React.useEffect(() => {
        if (allCategories.length > 0 && brandsList.length > 0 && !loadingSections) { 
            getRandomLists();
            setLoadingSections(true);
        }
    }, [allCategories, brandsList, id]);

    let getRandomLists = function() {
    let sectionTwo = productDetails?.categories ? productDetails?.categories[0] : chooseRandom(allCategories)
    // let sectionThree = chooseRandom(brandsList);

    dispatch(getProductsToSectionTwo(`page=1&category=${sectionTwo}&size=10&order=random`));
    console.log('trayendo productos relacionados')

    setChooseSection({
        two: sectionTwo,
        // three: sectionThree,
        show: true
    });
    }
      
    
    return (
        <div className={style.mainProduct}>
            <h1 className={style.titles_product_detail}> Product Details </h1>
            <div className={style.main_product_box}>
            <div className={style.mainProductDetail}>
                    {
                        productDetails.discount !== 0 &&
                        <div className={style.containerDiscount}>
                            {productDetails.discount}% OFF
                        </div>
                    }
                <div className={style.contain_image_productDetail}>
                    <img className={style.product_image} src={productDetails?.image} alt="Image Product Detail" />
                </div>
                <div className={style.box_detail_product_without_image}>
                    <p id={style.product_category}><strong>Category: </strong>{productDetails?.categories ? productDetails.categories[0] : 'WithOut Categories'}</p>
                    <h3 id={style.title_product}>{productDetails?.name}</h3>
                    <hr/>
                    <div className={style.price_rating}>
                        <div>
                            <span id={style.product_price_discount}> ${productDetails.discount !== 0 ? discountPrice : productDetails.price} </span>
                            <span id={style.product_price}> ${productDetails?.price} </span>
                            <div className={style.brand_product_detail}>
                                <p id={style.product_seller}>Brand: </p>
                                <div >
                                    <img className={style.image_brand_product_detail} src = {productDetails?.manufacturers ? productDetails.manufacturers[0]?.image : ""} alt = "brand product detail"/>
                                </div>
                            </div>
                        </div>
                        <div id={style.review_block}>
                            <p id={style.review_detail}>Rating: <strong>{score === 0 ? 'WithOut rating yet' : score.toFixed(1)}</strong> </p>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                                >
                                <Rating
                                    name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly
                                    value={score}
                                />
                            </Box>
                        </div>
                    </div>
                    
                    <hr/>

                    <h4 className='mt-2'>Description:</h4>
                    <p>{productDetails?.description}</p>
                    <hr/>

                    <Stack spacing={2} direction="row" id={style.box_btn_productdetail}>
                        <span className={style.stock_product_detail}>Stock: <span id={style.stock_status}>{productDetails?.stock} unid.</span></span>
                        <div id={style.box_btn_productdetail}>
                            <Button id={style.btn_Product_Detail} size="small" variant="contained" onClick={addtoCart}>Add to Cart</Button>
                            <Button id={style.btn_Product_Detail} size="small" variant="contained" onClick={addtoCartandCheckOut}>Buy</Button>
                        </div>
                    </Stack>                    
                    <hr/>

                    {/* <div className={style.rating-outer}>
                        <div className={style.rating-inner}></div>
                    </div> */}
                    
                </div>
            </div>
            <div className={style.mainProductDetail}>
                <span id={style.no_of_reviews}><strong>TAGS:</strong> - Intel - Nootbook - Procesador AMD </span>
                <hr/>
            </div>
            <div className={style.comment_main}>
                <div className={style.comment_add}>
                    <div>
                        <span><strong> QUESTIONS TO SELLER: </strong></span>
                    </div>
                    <div id={style.review_comment}>
                        <div>
                            <div id={style.review_block}>
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
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleSend}>Send</Button>
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
                            return(
                            <div key={parseInt(Math.random() * 10000 / Math.random())}>
                                <p> {element.comment.charAt(0) + element.comment.slice(1, element.comment.length).toLowerCase()} - ({element.createdAt.slice(0,10)})</p>
                                {element?.answer ? <p><strong>--- TechMarket Answer:</strong> {element.answer}- ({element.updatedAt.slice(0,10)})</p>: null}
                            </div>)
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
                        Product already added in Cart!      
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <BootstrapDialog
                    onClose={handleCloseLogin}
                    aria-labelledby="customized-dialog-title"
                    open={openLogin}
                >
                    <BootstrapDialogTitle id='style.customized-dialog-title' onClose={handleCloseLogin}>
                        You must be Login:
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            Register or log in to be able to make comments and discover 
                            all the functionalities of the website, 
                            such as exclusive discounts, additional promotions, etc.
                        </Typography>
                    </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleOpenPageLogin}>
                                Login
                            </Button>
                        </DialogActions>
                </BootstrapDialog>
            </div>
            <div className={style.comment_main}>
                <div className={style.comment_add}>
                    <div>
                        <span><strong> PRODUCT REVIEW: </strong></span>
                    </div>
                    <div id={style.review_comment}>
                        <div>
                            <div id={style.review_block}>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(productDetails.reviews?.length === 0)
                        ? <p>This product has no Review yet.</p>
                        : productDetails.reviews?.map((element) => {
                            return(
                            <div key={parseInt(Math.random() * 10000 / Math.random())}>
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                    >
                                    <Rating
                                        name="read-only"
                                        value={element?.score}
                                        readOnly
                                    />
                                </Box>
                                <p> - {element.comment.charAt(0) + element.comment.slice(1, element.comment.length).toLowerCase()}</p>
                            </div>)
                        })}
                </div>
                <Snackbar open={openWithOutStock} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
                    <Alert onClose={handleCloseSuccessComment} severity="info" sx={{ width: '100%' }}>
                        Sorry Product WithOut Stock!
                    </Alert>
                </Snackbar>
            </div>
            <h2 className={style.titles_product_detail}> Related Products </h2>
            <div className={style.catalogue}>
                {
                !chooseSection.show &&
                <div className = {style.noProductsContainer}>
                    <div className = {style.imageContainer}>
                        <Loading />
                    </div>
                    <span className = {style.span}>Loading Sections...</span>
                </div>
                }
                {
                chooseSection.show && 
                <>
                    <SectionCatalogue 
                    sectionPath = { `/store/category/${chooseSection.two}` }
                    sectionName = { chooseSection.two }
                    products = { section.two }
                    loading = { section.showLoadingTwo }
                    error = { section.errorTwo }
                    />
                </>
                }
            </div>
        </div>
        </div>
    )    
}