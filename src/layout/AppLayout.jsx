import { useState, Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { 
  Box, 
  Toolbar, 
  Container, 
  useTheme, 
  useMediaQuery, 
  CircularProgress,
  CssBaseline
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

const drawerWidth = 240;
const collapsedDrawerWidth = 70;

// Main content area that adjusts based on sidebar state
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'isMobile' })(
  ({ theme, open, isMobile }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: isMobile ? 0 : collapsedDrawerWidth,
    width: isMobile ? '100%' : `calc(100% - ${open ? drawerWidth : collapsedDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: isMobile ? 0 : drawerWidth,
      width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      width: '100%',
      padding: theme.spacing(2),
    },
  }),
);

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const AppLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      
      {/* Sidebar first - takes full height */}
      <Sidebar 
        open={sidebarOpen}
        mobileOpen={mobileOpen} 
        handleDrawerToggle={handleDrawerToggle}
        isMobile={isMobile}
      />
      
      {/* Content area with Navbar at top */}
      <Main open={sidebarOpen} isMobile={isMobile}>
        {/* Navbar inside the main content area */}
        <Navbar handleDrawerToggle={handleDrawerToggle} />
        
        {/* Content container */}
        <Box 
          sx={{ 
            pt: 2, 
            px: { xs: 2, sm: 3 }, 
            pb: 3, 
            height: 'calc(100vh - 64px)',
            overflow: 'auto',
            backgroundColor: '#f5f8fa'
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Outlet />
          </Suspense>
        </Box>
      </Main>
    </Box>
  );
};

export default AppLayout;