import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/authSlice';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Typography,
  Avatar
} from '@mui/material';

import headerLogo from '../../assets/images/NavLogo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown,Check, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userDetails } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleStatusClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  const handleProfileClick = () => {
    navigate('/doctor/profile');
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
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 1,
            px: isMobile ? 2 : 0
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/">
              <img
                src={headerLogo}
                alt="Doctor Logo"
                style={{ height: '32px', width: 'auto' }}
              />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              onClick={handleStatusClick}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#1af807',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 0.8
                }
              }}
            >
             
              <Typography>
                {userDetails?.status || 'Online'}
              </Typography>
              <ChevronDown size={18} />
            </Box>

            <IconButton onClick={handleProfileClick}>
              <Avatar
                src={userDetails?.profileImage}
                sx={{
                  width: 32,
                  height: 32,
                  border: '2px solid #e9ecef',
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  minWidth: '180px',
                  padding: '8px 0'
                }
              }}
            >
              <MenuItem disabled>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Check size={16} color="#1af807" />
                  <Typography variant="body2" sx={{ color: '#1af807' }}>
                    Current Status: {userDetails?.status || 'Online'}
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Box sx={{
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    width: 14,
                    height: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <X size={12} color="white" />
                  </Box>
                  <Typography variant="body2">
                    Set to Offline
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Box sx={{
                    backgroundColor: 'orange',
                    borderRadius: '50%',
                    width: 14,
                    height: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <X size={12} color="white" />
                  </Box>
                  <Typography variant="body2">
                    Set to Busy
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LogOut size={16} />
                  <Typography variant="body2">
                    Logout
                  </Typography>
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;