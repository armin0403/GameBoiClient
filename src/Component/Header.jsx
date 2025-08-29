import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
import LoginIcon from '@mui/icons-material/Login';
import { useModal } from '../Contexts/ModalContext';
import SignInContent from '../Contents/SignInContent';

export default function PrimarySearchAppBar({onMenuClick, darkMode, toggleDarkMode}) {
  const navigate = useNavigate();

  const {openModal, closeModal} = useModal();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleLogout = () =>{
    sessionStorage.clear();
    navigate('/HomePage')
  }
  const token = sessionStorage.getItem('jwtToken');
  const isLoggedIn = !!token;

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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem button onClick={() => {navigate('/Profile'); handleMenuClose()}}>Profile</MenuItem>
      <MenuItem button onClick={() => {navigate('/ProfileSettings'); handleMenuClose()}}>Settings</MenuItem>
      <MenuItem button onClick={() => {handleLogout(); handleMenuClose()}}>Log out
      
      </MenuItem>
    </Menu>
  );

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
      {isLoggedIn ? (
        <>
          <MenuItem>      
            <IconButton size="large" color="inherit">
                <MailIcon />
            </IconButton>
              <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              color="inherit"
            >
            <Badge>
              <NotificationsIcon />
            </Badge>
              </IconButton>
                <p>Notifications</p>
          </MenuItem>
          <ThemeSelector darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        </>
      ):(
      <>
        <MenuItem onClick={()=>{<SignInContent onClose={closeModal}/>}}>Login</MenuItem>
        <ThemeSelector darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      </>
      )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={() => navigate('/HomePage')}
          >
            Gameboi app v1.0
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {isLoggedIn ? (
          <>  
            <IconButton size="large" color="inherit">
              <Badge color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
            >
              <Badge color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
              <ThemeSelector darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >              
              <AccountCircle />
            </IconButton>
          </>):(
            <>
            <IconButton color="inherit" onClick={() => {
              openModal("Sign in here!", <SignInContent onClose={closeModal} />)}}              
            >
              <LoginIcon/>
            </IconButton>
            <ThemeSelector darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </>
          )}  
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
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}  
      {renderMenu}
    </Box>
  );
}