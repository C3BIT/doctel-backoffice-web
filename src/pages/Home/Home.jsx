import { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  IconButton,
  Avatar,
  Skeleton,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "../dashboard/Dashboard";
import Prescription from "../prescription/Prescription";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneIcon from "@mui/icons-material/Phone";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import sidebarLogo from '../../assets/icons/sidebar-logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "../../redux/auth/authSlice";
const Settings = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3, color: "#20ACE2", fontWeight: "bold" }}>
      Settings
    </Typography>
    <Typography>User settings and preferences will appear here</Typography>
  </Box>
);

const CallHistory = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3, color: "#20ACE2", fontWeight: "bold" }}>
      Call History
    </Typography>
    <Typography>Your call history will appear here</Typography>
  </Box>
);

const OnlineChat = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3, color: "#20ACE2", fontWeight: "bold" }}>
      Online Chat
    </Typography>
    <Typography>Chat interface will appear here</Typography>
  </Box>
);

const Withdraw = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" sx={{ mb: 3, color: "#20ACE2", fontWeight: "bold" }}>
      Withdraw
    </Typography>
    <Typography>Withdraw management panel will appear here</Typography>
  </Box>
);

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    primary: {
      main: "#20ACE2",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const Home = () => {
  const { user, token, userDetails, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails(token));
  }, [dispatch, token]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Online");
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, component: <Dashboard /> },
    {
      text: "Prescription",
      icon: <DescriptionIcon />,
      component: <Prescription />,
    },
    { text: "Call History", icon: <PhoneIcon />, component: <CallHistory /> },
    { text: "Online Chat", icon: <ChatIcon />, component: <OnlineChat /> },
    {
      text: "Withdraw",
      icon: <AccountBalanceWalletIcon />,
      component: <Withdraw />,
    },
    { text: "Settings", icon: <SettingsIcon />, component: <Settings /> },
    { text: "Sign Out", icon: <LogoutIcon />, component: null },
  ];

  const getActiveComponent = () => {
    return menuItems[selectedIndex]?.component || <Dashboard />;
  };

  const drawer = (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2, mt: 5, }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={sidebarLogo}
            alt="DOCTEL Logo"
            style={{
              height: '40px', // Adjust height as needed
              width: '150px',
              maxWidth: '100%'
            }}
          />
        </Box>
      </Box>
      <List sx={{ mt: 3 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding >
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => {
                setSelectedIndex(index);
                if (isSmallScreen) {
                  setMobileOpen(false);
                }
              }}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#20ACE2",
                  borderRadius: "16px",
                  mx: 1,
                  width: "calc(100% - 16px)",
                  "&:hover": {
                    backgroundColor: "#1A9BD0",
                  },
                  color: "white",
                },
                mx: 1,
                borderRadius: "16px",
                my: 1.3,
              }}
            >
              <ListItemIcon
                sx={{
                  color: selectedIndex === index ? "white" : "#737791",
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: selectedIndex === index ? "medium" : "normal",
                  color: selectedIndex === index ? "white" : "#737791",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <CssBaseline />

        {/* AppBar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            backgroundColor: "white",
            borderBottom: "1px solid white",
            pt: 2,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" }, color: "#333" }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", mr: 2 }}>
                  <Typography variant="h6" component="div" sx={{ color: "#20ACE2", fontWeight: "bold", ml: 1 }}>
                    DOCTEL
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "6px 12px 6px 6px",

                    position: "relative",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  {isLoading ? (
                    <Box
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: (theme) => theme.spacing(1),
                        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
                        marginRight: (theme) => theme.spacing(2),
                      }}
                    >
                      <Skeleton variant="rectangular" width="100%" height="100%" />
                    </Box>
                  ) : (
                    <Avatar
                      src={userDetails?.profileImage}
                      alt="Dr. Musfiqur Rahman"
                      sx={{
                        width: 55,
                        height: 46,
                        borderRadius:"10px",
                        border: "2px solid #20ACE2",
                      }}
                    />
                  )}
                  <Box sx={{ ml: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        fontSize: "0.9rem",
                        lineHeight: 1.2,
                      }}
                    >
                      Dr. Musfiqur Rahman
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", color: "#20ACE2" }}>
                      <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: "medium" }}>
                        {currentStatus}
                      </Typography>
                      <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                    </Box>
                  </Box>

                  {showStatusDropdown && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        width: "100%",
                        zIndex: 100,
                        overflow: "hidden",
                        border: "1px solid #f0f0f0",
                        mt: 1,
                      }}
                    >
                      {["Online", "Busy", "Offline", "On Another Call"].map((status) => (
                        <Box
                          key={status}
                          sx={{
                            padding: "8px 12px",
                            "&:hover": {
                              backgroundColor: "#f5f5f5",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentStatus(status);
                            setShowStatusDropdown(false);
                          }}
                        >
                          <Typography variant="body2" sx={{ color: "#333" }}>
                            {status}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "8px",
                    px: 2,
                    py: 1.2,
                    mr: 2,
                    width: { xs: 140, sm: 300, md: 400  },
                    height: "40px",
                  }}
                >
                  <SearchIcon sx={{ color: "#20ACE2", mr: 1, fontSize: 20 }} />
                  <input
                    type="text"
                    placeholder="Search here..."
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      backgroundColor: "transparent",
                      fontSize: "14px",
                      color: "#424242",
                      padding: "4px 0",
                      height: "100%",
                    }}
                  />
                </Box>
                <IconButton
                  sx={{
                    backgroundColor: "#fff4e5",
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#ffe0b2",
                    },
                    position: "relative",
                  }}
                >
                  <NotificationsIcon sx={{ color: "#ff9800", fontSize: 20 }} />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#f44336",
                    }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Sidebar Navigation */}
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="navigation menu"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: "1px solid white",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "#fafafa",
            minHeight: "100vh",
          }}
        >
          <Toolbar /> {/* This creates space below the AppBar */}
          {getActiveComponent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;