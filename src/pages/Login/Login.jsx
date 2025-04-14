import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  useMediaQuery
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { errorClean, resetState } from '../../redux/auth/authSlice';
import Loader from '../../components/loader/Loader';
import showToast from '../../utils/toast';
import HeaderSection from './HeaderSection';
import TitleSection from './TitleSection';
import PhoneLoginForm from './PhoneLoginForm';
import OtpVerificationForm from './OtpVerificationForm';
import FooterSection from './FooterSection';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#0052A8',
    },
    background: {
      default: '#F9F9F9',
    },
    text: {
      primary: '#375560',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0052A8',
          },
        },
      },
    },
  },
});

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated, isLoading, success, error, errorMessage } = useSelector((state) => state.user);

  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [phone, setPhone] = useState('');

  const handleClear = () => {
    setShowOtpVerify(false);
    dispatch(resetState());
    showToast('info', 'Verification cancelled. You can try again.');
  };

  useEffect(() => {
    if (error) {
      showToast('error', errorMessage || 'An error occurred');
      const timer = setTimeout(() => {
        dispatch(errorClean());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, errorMessage, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    
    if (success && !isAuthenticated) {
      setShowOtpVerify(true);
      showToast('success', 'OTP sent successfully');
    }
  }, [isAuthenticated, success, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: '#F9F9F9',
          justifyContent: 'flex-start',
          alignItems: 'center',
          pt: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Loader open={isLoading} />
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2,
              backgroundColor: 'white',
              width: '100%'
            }}
          >
            <HeaderSection isMobile={isMobile} />
            <TitleSection isMobile={isMobile} showOtpVerify={showOtpVerify} />
            
            {!showOtpVerify ? (
              <PhoneLoginForm 
                phone={phone}
                setPhone={setPhone}
                setShowOtpVerify={setShowOtpVerify}
                isLoading={isLoading}
              />
            ) : (
              <OtpVerificationForm
                phone={phone}
                handleClear={handleClear}
                isLoading={isLoading}
              />
            )}
            
            <FooterSection />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginScreen;