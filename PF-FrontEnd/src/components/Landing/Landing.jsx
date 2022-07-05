import React from "react";
import gitfLogo from './img/logo_TechMarket.gif';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import ListItemText from '@mui/material/ListItemText';
// import ListItem from '@mui/material/ListItem';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { closeLanding } from '../../redux/actions'
import './Landing.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide ref={ref} {...props} />;
  });

export default function Landing() {

    // const [open, setOpen] = React.useState(false);
    const viewLanding = useSelector((state) => state.general.viewLanding);
    const dispatch = useDispatch();
  
    // const handleClickOpen = () => {
    //   setOpen(true);
    // };
  
    const handleClose = () => {
      dispatch(closeLanding())
    //   setOpen(false);
    };
    
    const left = document.getElementsByClassName('left')
    const right = document.getElementsByClassName('right')
    const [ container, setContainer ] = React.useState('container_landing_page');
    
    const handleEnterLeft = () => {
        setContainer('hover-left')
    };

    const handleLeaveLeft = () => {
        setContainer('container_landing_page')
    };

    const handleEnterRight = () => {
        setContainer('hover-right')
    };

    const handleLeaveRight = () => {
        setContainer('container_landing_page')
    };

    return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={viewLanding}
        // onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="main_landing_page">
            <div className={container}>
                <div className="split left" onMouseEnter={handleEnterLeft} onMouseLeave={handleLeaveLeft}>
                    <h1 id="text_landing_page">
                        Welcome to TechMarket! 
                    </h1>
                    <img src={gitfLogo} className="btn_image_logo" alt='logo techmarket' />
                    {/* <a href="#" className="btn">Buy Now</a> */}
                </div>
                <div className="split right" onMouseEnter={handleEnterRight} onMouseLeave={handleLeaveRight}>
                    {/* <a href="#" className="btn" onClick={handleClose}>Start</a> */}
                    <div className="login-box">
                        <form className="form-start-landing">
                            <a href="#"  onClick={handleClose}>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            Come in
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </Dialog>
    </div>        
    )
}