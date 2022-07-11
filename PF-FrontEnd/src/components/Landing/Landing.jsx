import React from "react";
import gitfLogo from './img/logo_TechMarket.gif';
import Dialog from '@mui/material/Dialog';
import { getUserDetail, getUserReviews, getAllCommentByUserID, getOrderByUser} from '../../redux/actions'
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { closeLanding } from '../../redux/actions'
import './Landing.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide ref={ref} {...props} />;
  });

export default function Landing() {
    const { user } = useSelector((state) => state.general);
    const dispatch = useDispatch();
    React.useEffect(() => {
        if(user?.user) {
            dispatch(getUserDetail(user?.user.id))
            dispatch(getUserReviews(user?.user.id))
            dispatch(getAllCommentByUserID(user?.user.id))
            dispatch(getOrderByUser(user?.user.id))
        }    
      }, []);

    const viewLanding = useSelector((state) => state.general.viewLanding);
  
    const handleClose = () => {
      dispatch(closeLanding())
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
        className='box_big_landing_page'
      >
        <div className="main_landing_page">
            <div className={container}>
                <div className="split left" onMouseEnter={handleEnterLeft} onMouseLeave={handleLeaveLeft}>
                    <h1 className = "titleLandingPage" id="text_landing_page">
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