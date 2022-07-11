import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, CardContent, Card, Grid } from "@mui/material";
import Button from '@mui/material/Button';
import { showCart } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { finishOrder, getUserDetail } from "../../redux/actions"
import paymentMetod from './img/paymentMetod.webp';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import secure from './img/secure.gif'
import './CheckOut.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CheckOut = () => {
  const history = useHistory();
  const productsCart = useSelector((state) => state.general.productsCart)
  const stateFinishOrder = useSelector((state) => state.general.finishOrder)
  const { user } = useSelector((state) => state.general)
  const { oneuser } = useSelector((state) => state.userReducer)
  const dispatch = useDispatch();
  const [input, setInput] = React.useState({
    name: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    info: "",
  });

  const [items, setItems] = React.useState({});
  const [openWithOutStock, setOpenWithOutStock] = React.useState(false);
  const [openYouAreAdmin, setOpenYouAreAdmin] = React.useState(false);

  const preOrder = () => {
    const formMercadoPAgo = productsCart?.map((product) => ({
      id: product.id,
      title: product.name,
      description: product.description ? product.description : 'Product of Tech, seller TechTegnology',
      picture_url: product.image,
      category_id: product.categories[0] ? product.categories[0] : 'Tech',
      quantity: product.quantity,
      unit_price: product.discount !== 0 ? Math.round(product.price - product.price * (product.discount / 100)) : product.price
    }))
    setItems(formMercadoPAgo)
  }
  
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    return setOpen(false), history.push("/");
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputEmail = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    preOrder()
  };

  let resultTotalValue = 0;
  const totalValue = () => {
    productsCart?.map((product) => {
      resultTotalValue += product?.quantity * (product.discount !== 0 ? Math.round(product.price - product.price * (product.discount / 100)) : product.price)
    })
  };
totalValue();

  React.useEffect(()=>{
    if(user?.user) {
      dispatch(getUserDetail(user?.user.id))
    }  
    if(stateFinishOrder?.data){
          window.location.href = stateFinishOrder?.data;          
    }
  },[stateFinishOrder])
  
  // idUser, idAddress, branchOfficeId,
  const handleSubmit = (e) => {
    e.preventDefault();
    if(productsCart.length > 0 && !user?.user?.admin){
      dispatch(finishOrder(input.email, user.user.id, null, null, items, null, null, null))    
    } 
    if(productsCart.length > 0 && user?.user?.admin){
      setOpenYouAreAdmin(true);
    }
    if(productsCart.length === 0){
      setOpenWithOutStock(true);
    }
  };

  const handleCloseSuccessComment = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWithOutStock(false);
    setOpenYouAreAdmin(false);
  };

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(showCart());
  };
  
  return (
    <div className="main_checkout_cartdetail">
      <div className="box_top_checkout">
        <div className="main_title_checkout_page">
          <img className="img_checkout_secure" src={secure} alt='secure' />
          <h2>CHECK OUT</h2>
        </div>
        <Divider width={"100%"}></Divider>
        <h3>Purchase's Detail</h3>
        <div className="addtocart_mainblock_checkout">
          {(productsCart?.length === 0)
                        ? <p>You don't have product in cart.</p>
                        : productsCart?.map((e) => {
                          return (
                            <div className="box_top_checkout_resumecart">
                              <img className="img_checkout_page" src={e?.image} alt={e?.name} />
                              <div className="addtocart_name_checkout">
                                 <h5 id="checkout_title_product">{e?.name.slice(0,60)}</h5>
                                 <h5><strong>Price: </strong> ${e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price} {`x ${e?.quantity} unid.`}</h5>
                              </div>
                              <div className="quantity_price_checkout">
                                 <div>
                                     <p className="information_addtocart_checkout">SubTotal: ${(e?.quantity * (e?.discount ? Math.round(e?.price - e?.price * (e?.discount / 100)) : e?.price))}</p>
                                 </div>
                              </div>
                            </div>
                      )})
                    }            
          </div>
          <Divider  width={"100%"}></Divider>
              {productsCart?.length === 0 
                    ? <span></span>
                    : (<div className="information_addtocart_checkout">
                            <Button id="btn_checkou_editorder" variant="outlined" size="medium" onClick={handleCart}>Edit Order</Button>
                            <p className="total_value_checkout">Total: ${resultTotalValue}</p>
                        </div>
              )}
      </div>
      <div className="App">
       <br />
       <br />
       <br />
       <br />
        <Grid>
          <Card
            style={{ maxWidth: "50rem", padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h6">
                Personal Information
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                Fill in all the fields to complete your order.
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      name="name"
                      // inputRef=""
                      value={input.name}
                      placeholder="Enter first name"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      name="lastName"
                      value={input.lastName}
                      placeholder="Enter last name"
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      value={input.email}
                      type="email"
                      placeholder="Enter your email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleInputEmail}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      name="address"
                      value={input.subject}
                      placeholder="Enter your Address"
                      label="Address"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="phone"
                      type="number"
                      value={input.phone}
                      placeholder="Enter phone number"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="info"
                      label="Additional Information"
                      value={input.msg}
                      multiline
                      rows={4}
                      placeholder="Additional notes on your order, clarifications for delivery."
                      variant="outlined"
                      fullWidth
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <a href={stateFinishOrder?.data ? stateFinishOrder.data : null}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Finish Order
                      </Button>
                    </a>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
        <br />
       <br />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="style">
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email has been sent successfully
          </Typography>
          <Button onClick={handleClose}>X</Button>
        </Box>
      </Modal>
      <div className="bottom_checkout">
            <h4>Payment methods available through Mercado Pago (credit card, debit card, Rapipago, etc.)</h4>
            <img className="paymentMetodCheckOut"
              alt="Payment Metod"
              src={paymentMetod}
            />
      </div>
      <Snackbar open={openWithOutStock} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
          <Alert onClose={handleCloseSuccessComment} severity="warning" sx={{ width: '100%' }}>
              Don't have products in Cart!
          </Alert>
      </Snackbar>

      <Snackbar open={openYouAreAdmin} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
          <Alert onClose={handleCloseSuccessComment} severity="error" sx={{ width: '100%' }}>
              Sorry you are Admin, You can't buy!
          </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckOut;
