import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Container,
  useTheme,
  useMediaQuery
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import headerLogo from '../../assets/images/NavLogo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [notificationCount] = useState(3);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#0052A8',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 1,
            px: isMobile ? 2 : 0
          }}
        >
          {/* Logo container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >

            <Link to="/">
              <img
                src={headerLogo}
                alt="Doctor Logo"
                style={{ height: '32px', width: 'auto' }}
              /> </Link>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              size="medium"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <Badge
                badgeContent={notificationCount}
                color="error"
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.65rem',
                    height: '18px',
                    minWidth: '18px',
                  }
                }}
              >
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              color="inherit"
              onClick={handleLogout}
              size="medium"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;