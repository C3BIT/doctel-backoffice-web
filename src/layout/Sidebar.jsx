import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import DashboardIcon from '../assets/sidebar/dashboard.svg';
import PrescriptionIcon from '../assets/sidebar/prescription.svg';
import CallHistoryIcon from '../assets/sidebar/call-history.svg';
import OnlineChatIcon from '../assets/sidebar/online-chat.svg';
import WithdrawIcon from '../assets/sidebar/withdraw.svg';
import SettingsIcon from '../assets/sidebar/settings.svg';
import SignOutIcon from '../assets/sidebar/sign-out.svg';
import DoctelLogo from '../assets/sidebar/doctel-logo.svg';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authSlice';
import { useEffect } from 'react';
import { updateDocumentTitle } from '../utils/titleUtils';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { id: 'prescription', label: 'Prescription', icon: PrescriptionIcon, path: '/prescription/list' },
  { id: 'call-history', label: 'Call History', icon: CallHistoryIcon, path: '/call-history' },
  { id: 'online-chat', label: 'Online Chat', icon: OnlineChatIcon, path: '/online-chat' },
  { id: 'withdraw', label: 'Withdraw', icon: WithdrawIcon, path: '/withdraw' },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, path: '/settings' },
  { id: 'sign-out', label: 'Sign Out', icon: SignOutIcon, path: '/logout' }
];

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

const Sidebar = ({ open, mobileOpen, handleDrawerToggle, isMobile }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  
  useEffect(() => {
    updateDocumentTitle(location.pathname, navigationItems);
  }, [location.pathname]);

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: open ? 'space-between' : 'center',
          height: '64px',
          px: open ? '24px' : '0',
          borderBottom: '1px solid #EAECF0'
        }}
      >
        {open ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={DoctelLogo}
              alt="DOCTEL"
              style={{
                height: '50px',
                width: '120px'
              }}
            />
          </Box>
        ) : (
          <img
            src={DoctelLogo}
            alt="DOCTEL"
            style={{
              height: '24px',
              width: '24px'
            }}
          />
        )}

        {!isMobile && open && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              width: '24px',
              height: '24px',
              p: '4px',
              color: '#667085'
            }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      <List sx={{
        p: '16px',
        '& .MuiListItem-root': {
          mb: '8px'
        }
      }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{
              display: 'block',
            }}
          >
            <ListItemButton
              sx={{
                minHeight: '48px',
                justifyContent: open ? 'flex-start' : 'center',
                px: '12px',
                py: '12px',
                borderRadius: '6px',
                backgroundColor: isActive(item.path) ? '#20ACE2' : 'transparent',
                color: isActive(item.path) ? '#FFFFFF' : '#737791',
                '&:hover': {
                  backgroundColor: isActive(item.path) ? '#20ACE2' : '#F9FAFB',
                  '& .MuiListItemIcon-root img': {
                    filter: isActive(item.path) 
                      ? 'brightness(0) invert(1)' // White for active items
                      : 'brightness(0) saturate(100%) invert(48%) sepia(9%) saturate(669%) hue-rotate(202deg) brightness(93%) contrast(89%)'
                  }
                },
              }}
              onClick={() => item.id === 'sign-out' ? handleLogout() : handleNavigation(item.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? '12px' : 0,
                  justifyContent: 'center',
                  color: 'inherit',
                  '& img': {
                    width: '20px',
                    height: '20px',
                    filter: isActive(item.path)
                      ? 'brightness(0) invert(1)' // White filter for active items
                      : 'brightness(0) saturate(100%) invert(48%) sepia(9%) saturate(669%) hue-rotate(202deg) brightness(93%) contrast(89%)'
                  }
                }}
              >
                <img src={item.icon} alt={item.label} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '16px',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      lineHeight: '30px',
                      letterSpacing: '0.15px'
                    }
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid #EAECF0',
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: open ? drawerWidth : collapsedDrawerWidth,
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            borderRight: '1px solid #EAECF0',
            backgroundColor: '#FFFFFF'
          },
        }}
      >
        {drawerContent}
        {!open && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: 'absolute',
              right: '-12px',
              top: '72px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAECF0',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              '&:hover': {
                backgroundColor: '#FFFFFF',
              },
              width: '24px',
              height: '24px',
              p: '4px',
            }}
          >
            <ChevronRightIcon fontSize="small" sx={{ color: '#667085' }} />
          </IconButton>
        )}
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
};

Sidebar.defaultProps = {
  isMobile: false
};

export default Sidebar;