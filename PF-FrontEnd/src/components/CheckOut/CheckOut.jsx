import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, CardContent, Card, Grid, Button } from "@mui/material";
import { send, init } from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { finishOrder } from "../../redux/actions"
import './CheckOut.css';

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

  const [input, setInput] = React.useState({
    name: "",
    lastName: "",
    email: "",
    subject: "",
    phone: "",
    msg: "",
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, subject, email, phone, msg } = input;
    // init(`${KEY}`);
    send(
      "service_h4stj4s",
      "template_c38r8ts",
      { name, lastName, subject, email, phone, msg },
      "NPC49Hu7bfisw1Zjw"
    )
      .then((response) => {
        console.log(response.status, response.text);
        setOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
    setInput({
      name: "",
      lastName: "",
      email: "",
      subject: "",
      phone: "",
      msg: "",
    });
  };
  
  return (
    <div>
      <div className="App">
       <br />
       <br />
       <br />
       <br />
        <Grid>
          <Card
            style={{ maxWidth: "45rem", padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                CHECK OUT
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
                      inputRef=""
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
                      onChange={handleInput}
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
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Finish Order
                    </Button>
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
    </div>
  );
};

export default CheckOut;

{/*`${SERVICE}`,
      `${TEMPLATE}`
    ${KEY} */}