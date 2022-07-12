import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getSearchProducts, clearSearchProducts, showCart, logout } from "../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../../redux/actions';
//Favs:
import { showFavs } from '../../redux/actions';
//
import './NavBar.css';
import gitfLogo from './img/logo_TechMarket.gif';
import userAvatar from './img/user_avatar.png';

// Nueva Navbar
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ScrollToTop from "react-scroll-to-top";
import StorefrontIcon from '@mui/icons-material/Storefront';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import Avatar from '@mui/material/Avatar';
// Dependencias para Notification
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//Favs:
import FavoriteIcon from '@mui/icons-material/Favorite';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '380px',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function NavBar() {
  const history = useHistory()
  const { theme } = useSelector(state => state.general);  
  const [ name, setName ] = React.useState('');
  const { user } = useSelector((state) => state.general)
  const { oneuser } = useSelector((state) => state.userReducer);
  const [ notification, setNotification ] = React.useState(0);
  const [ openNotification, setOpenNotification ] = React.useState(false);
  const { commentByUser } = useSelector((state) => state.userReducer);
  const productsCart = useSelector((state) => state.general.productsCart);
  
  //Favs
  const { favouritesProducts } = useSelector ((state) => state.general);
  //
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(clearSearchProducts())
    setName(e.target.value);
    dispatch(getSearchProducts(name));
  }

  // Notification:
  const handleCloseSuccessComment = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotification(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleNotification = () => {
    setOpenNotification(true);
  }

// Nueva NAVBAR
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [displayUser, setDisplayUser] = React.useState(false);
  const [displayUserAdmin, setDisplayUserAdmin] = React.useState(false);
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const logOutNavBar = (e) => {
    e.preventDefault()
    handleMenuClose()
    dispatch(logout())
    //history.push('/')
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const showCartNavBar = (e) => {
    e.preventDefault();
    dispatch(showCart())
  };

  //Favs
   const showFavsNavBar = (e) => {
    e.preventDefault();
    dispatch(showFavs())
   };
  //

  const menuId = 'primary-search-account-menu';
  
  // Menu del Avatar:
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {user?.user ? <span>
                        <Link to="/myprofile" className="links_profile_user">
                          <MenuItem onClick={handleMenuClose} >My Profile</MenuItem>
                        </Link>
                        <Link to="/signup" className="links_profile_user">
                          <MenuItem onClick={logOutNavBar} >LogOut</MenuItem>
                        </Link>
                    </span>
                    : <span>
                        <Link to="/login" className="links_profile_user">
                          <MenuItem onClick={handleMenuClose} >Sign In</MenuItem>
                        </Link>
                        <Link to="/signup" className="links_profile_user">
                          <MenuItem onClick={handleMenuClose} >Sign Up</MenuItem>
                        </Link>
                    </span>}
    </Menu>
  );

  // Menu Versión Movile
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem sx={!user?.user ? { display: 'none' } : { display: 'inline-flex', flexGrow: 1, alignItems: 'center' }} fontSize="1rem" component="div">
        <Typography >
            Welcome {user?.user?.name}
        </Typography>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={showCartNavBar}>
          <Badge badgeContent={productsCart?.length} color="error">
            <ShoppingCartIcon/>
          </Badge>
        </IconButton>
        <p>Your Cart</p>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="store" color="inherit">
          <Badge badgeContent={0} color="error">
            <Link to={'/store'} className="links_general_movile_nabvar">
              <StorefrontIcon className="links_general_movile_nabvar"/>
            </Link>
          </Badge>
        </IconButton>
        <p>Store</p>
      </MenuItem>

      <MenuItem sx={!displayUserAdmin ? { display: 'none' } : { display: 'inline-flex' }}>
        <IconButton 
          size="large" 
          aria-label="create_product" 
          color="inherit"
        >
          <Badge badgeContent={0} color="error">
            <Link to={'/admin/dashboard'} className="links_general_movile_nabvar">
              <DisplaySettingsIcon className="links_general_movile_nabvar"/>
            </Link>
          </Badge>
        </IconButton>
        <p>Dashboard</p>
      </MenuItem>

      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={notification} color="error">
            <MailIcon onClick={handleNotification}/>
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={favouritesProducts?.length} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <p>Favorites</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar 
            alt="PhotoMyProfile"
            src={user.user 
              ? oneuser?.image 
                    ? oneuser?.image
                    : userAvatar
              : null}
            sx={{ width: 24, height: 24, bgcolor: 'black', color: 'white'}}
          />
        </IconButton>
        <p>My Profile</p>
      </MenuItem>

      <MenuItem sx={{justifyContent: "center"}}>
        <Stack direction="row" spacing={1} alignItems="center" >
          <Typography><LightModeIcon /></Typography>
            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onClick={handleCheck}/>
          <Typography><Brightness3Icon /></Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );

  function handleCheck() {
    if(theme === 'lightTheme'){
      dispatch(changeTheme('DARK'));
    } else {
      dispatch(changeTheme('LIGHT'));
    }
  };
  
  React.useEffect(() => {
    if(user?.user){
      setDisplayUser(true);
      if(user.user.admin){
        setDisplayUserAdmin(true);
      }
    }
    // Notification
    if(commentByUser?.length > 0){
      let resetNotification = 0;
      commentByUser.map((comment)=>{
        if(comment.viewed === false && comment.answer){
          resetNotification += 1
        }
      })
    setNotification(resetNotification);
    }
  },[user, commentByUser]);

  
    return (
      /// Nueva NAVABar
      <nav className='navbar_main_block'>
         <Snackbar open={openNotification} autoHideDuration={6000} onClose={handleCloseSuccessComment}>
              <Alert onClose={handleCloseSuccessComment} severity="info" sx={{ width: '100%' }}>
                  {notification === 0 
                        ? 'WithOut new Messages'
                        : `You have ${notification} new answer to see. Check your Profile.`}
              </Alert>
          </Snackbar>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
          <Toolbar>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography><LightModeIcon /></Typography>
                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onClick={handleCheck}/>
              <Typography><Brightness3Icon /></Typography>
            </Stack>
          </Box>

          <Link to="/">
            <Box
              alignSelf="center"
              flex="0 0"
              component="img"
              alt="logo"
              src={gitfLogo}
              maxHeight={80}
            />
          </Link>
          <Search >
            <Link to={(name !== '') ? `/store/name/${name}` : ''} underline="none">
                    <SearchIcon id='searchIcon'/>
            </Link>
            <StyledInputBase
              placeholder="Search ..."
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => handleSearch(e)}
            />
          </Search>
          
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <Typography sx={!user?.user ? { display: 'none' } : { display: 'inline-flex', flexGrow: 1, alignItems: 'center' }} fontSize="1rem" component="div">
                Welcome {user?.user?.name}
            </Typography>
          
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={showCartNavBar}>
              <Badge badgeContent={productsCart?.length} color="error">
                <ShoppingCartIcon className="links_general"/>
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="store" color="inherit">
              <Badge badgeContent={0} color="error">
                <Link to={'/store'} className="links_general">
                  <StorefrontIcon />
                </Link>
              </Badge>
            </IconButton>

            <IconButton 
                size="large" 
                aria-label="create_product" 
                color="inherit"
                sx={!displayUserAdmin ? { display: 'none' } : { display: 'inline-flex' }}
              >
              <Badge badgeContent={0} color="error">
                <Link to={'/admin/dashboard'} className="links_general">
                  <DisplaySettingsIcon />
                </Link>
              </Badge>
            </IconButton>

              <IconButton size="large" aria-label="favourites" color="inherit" onClick={showFavsNavBar}>
                <Badge badgeContent={favouritesProducts?.length} color="error">
                    <FavoriteIcon />
                </Badge>
              </IconButton>

            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={notification} color="error">
                <MailIcon className="links_general" onClick={handleNotification}/>
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 0 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon className="links_general"/>
              </Badge>
            </IconButton>

            <IconButton
              sx={displayUser ? { display: 'none' } : { display: 'inline-flex' }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                alt="Avatar"
                src={user.user 
                  ? oneuser?.image 
                        ? oneuser?.image
                        : userAvatar
                  : null}
                sx={{ width: 24, height: 24, color: '#3874CB', bgcolor: 'white' }}/>
            </IconButton>

            <IconButton
              sx={!displayUser ? { display: 'none' } : { display: 'inline-flex' }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                alt="Avatar"
                src={user.user 
                        ? oneuser?.image 
                              ? oneuser?.image
                              : userAvatar
                        : null}
                sx={{ width: 24, height: 24, color: '#3874CB', bgcolor: 'white' }}/>
            </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon className="links_general"/>
            </IconButton>
        </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* { displayUser ? {renderMenuProfileNormalUser} : {renderMenu} } */}
      {renderMenu}
    </Box>
    <div className = {'scrollToTop'}>
      <ScrollToTop smooth component={<ExpandLessIcon />} />
    </div>
    </nav>
    )
};
const THEME = {
  LIGHT: 'lightTheme',
  DARK: 'darkTheme'
}