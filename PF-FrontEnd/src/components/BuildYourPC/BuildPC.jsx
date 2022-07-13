import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '../Pagination/Pagination';
import ShowResultCount from '../ShowResultCount/ShowResultCount';
import ProductCard from '../ProductCard/ProductCard';
import LoadingStore from '../LoadingStore/LoadingStore';
import { addProductToCart, closeStore, getProductsWithFiltersAndPaginate,
          setShowLoading, updateFilter } from '../../redux/actions';
import { buildFilter } from '../../util';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Button } from '@mui/material';

import s from './BuildPC.module.css';
import Loading from '../SVG/Loading';
import CustomizedSteppers from './Stepper';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'var(secondaryColor)',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: 'var(--primaryColor)',
  zIndex: 1,
  color: 'var(--fontColor)',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Select a DISK DRIVE', 'Select a GRAPHIC CARD', 'Select a CPU PROCESSORS', 'Select your MONITOR', 'Select your KEYBOARD', 'Select a MOUSE', 'Select a MODEM ROUTER', ' Select your PC COMPONENTS'];


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function BuildPC() {

  const dispatch = useDispatch();
  const { showLoading, showError, showStore, products, noProducts, filter, results } = useSelector(state => state.storepage);
  const categoryOrder = ["DISK DRIVES", "GRAPHIC CARDS", "CPU PROCESSORS", "MONITORS", "KEYBOARDS", "MOUSE", "MODEM ROUTER", "PC COMPONENTS"];
  const [ next, setNext ] = useState(false);
  const [ prev, setPrev ] = useState(true);
  const [ finished, setFinished ] = useState(false);
  const [ disabledBtn, setDisabledBtn ] = useState(false); 
  const [ filterUpdated, setFilterUpdated ] = useState(false);
  const [openSuccessAddToCart, setOpenSuccessAddToCart] = useState(false);

  let index = 0;

  useEffect(() => {

    let idTimeOut = setTimeout(() => {
  
      if (next && index < categoryOrder.length) {
        index++
        handleUpdateFilter('category', categoryOrder[index]);
      } else if (index >= categoryOrder.length) return setFinished(true);
       
      if (prev && index > 0) {
        index--
        handleUpdateFilter('category', categoryOrder[index]);
      } else if (index <= 0) return setDisabledBtn(true)

    }, Math.random() * 400 + 1000);

    return () => {
      dispatch(closeStore());
      clearTimeout(idTimeOut);
    }
  }, [dispatch, next, prev])


  useEffect(() => {

      dispatch(getProductsWithFiltersAndPaginate(buildFilter({
        ...filter,
        category:  !finished ? categoryOrder[index] : 'None',
        page: 1,
        name: ''
      })));
  }, [filterUpdated]);

  let handleUpdateFilter = function(property, value) {
    let newFilter = { 
      ...filter,
      [property]: value,
      page: 1
    }
    if (property !== 'name') newFilter.name = '';
    setFilterUpdated(true);
    dispatch(updateFilter(newFilter));
  };


  const handleAddToCart = (id) => {
    setNext(true);

    dispatch(addProductToCart(id));
    setOpenSuccessAddToCart(true);
  };

  const handleCloseSuccessComment = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessAddToCart(false);
  };

  
  return (
    <div className = {s.container}>
      <div className = {s.title}>
        BUILD YOUR OWN PC!
        </div>
      <div className = {s.containerGrid}>
        
        <div className = {s.stepper}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
              </Step>
              ))}
          </Stepper>
          <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        </div>
        
        <div className = {s.subHeaderZone}>

          <ShowResultCount loading = {showLoading} results = {results} page = {filter.page} pages = {filter.pages} />
        </div>
        <div className = {s.pagination}>
          <Pagination />
        </div>
        {
          !showLoading && !showError && products && products.length > 0 &&
          <div className = {s.producCardsStore}>
            <div className = {s.cardsContainer}>
            {
            products && products.length > 0 && products.map((product, index) => 
              <Button key={index} onClick={()=>handleAddToCart(product.id)}>
                <ProductCard 
                id = {product.id}
                name = {product.name}
                category = {product.categories[0]}
                price = {product.price}
                stock = {product.stock}
                discount = {product.discount}
                rating = {9.5}
                image = {product.image}
                brand = {product.manufacturers[0]}
                key = {`product-${product.id}-${index}`}
                />
              </Button>
              )}
            </div>  
            <Snackbar open={openSuccessAddToCart} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
              <Alert onClose={handleCloseSuccessComment} severity="success" sx={{ width: '100%' }}>
                Product Added to Cart!
              </Alert>
            </Snackbar>          
          </div>
        }
        <LoadingStore loading = {showLoading} error = {showError} noResults = {noProducts}/>
        <div className = {s.paginationBottom}>
          <Pagination />
        </div>
      </div>
    </div>
  );
}