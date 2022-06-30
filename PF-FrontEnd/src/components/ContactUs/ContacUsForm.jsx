import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField, CardContent, Card, Grid, Button } from "@mui/material";
import { send, init } from "emailjs-com";
import { useHistory } from "react-router-dom";

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
const ContacUsForm = () => {

  const history = useHistory();

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
            style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}
          >
            <CardContent>
              <Typography gutterBottom variant="h5">
                Contact Us
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                gutterBottom
              >
                Fill up the form and we will get back to you within 24 hours.
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
                      placeholder="Enter email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      onChange={handleInput}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      name="subject"
                      value={input.subject}
                      placeholder="Enter subject"
                      label="subject"
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
                      name="msg"
                      label="Message"
                      value={input.msg}
                      multiline
                      rows={4}
                      placeholder="Type your message here"
                      variant="outlined"
                      fullWidth
                      required
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
                      Submit
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
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Email has been sent successfully
          </Typography>
          <Button onClick={handleClose}>X</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ContacUsForm;

{/*`${SERVICE}`,
      `${TEMPLATE}`
    ${KEY} */}