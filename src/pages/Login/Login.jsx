/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  useMediaQuery,
  InputAdornment,
  CircularProgress,
  Paper,
  Stack
} from '@mui/material';
import { 
  errorClean, 
  savePhone, 
  sendOtp, 
  createPatientLogin,
} from '../../redux/auth/authSlice';
import logo from '../../assets/images/Logo.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from '../../components/loader/Loader';
import showToast from '../../utils/toast';

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

const OTP_RESEND_TIMEOUT = 150;
const OTP_COOLDOWN_PERIOD = 30000;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated, isLoading, success, error, errorMessage } = useSelector((state) => state.user);

  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(OTP_RESEND_TIMEOUT);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [lastOtpRequest, setLastOtpRequest] = useState(0);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const isValidPhone = (phone) => {
    return /^01[3-9]\d{8}$/.test(phone);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 11) {
      setPhone(input);
    }
  };

  const handleLogin = async () => {
    if (!isValidPhone(phone)) {
      showToast('error', "Please enter a valid Bangladeshi phone number (e.g. 01712345678)")
      return;
    }

    const now = Date.now();
    if (now - lastOtpRequest < OTP_COOLDOWN_PERIOD) {
      showToast('error', (`Please wait ${Math.ceil((OTP_COOLDOWN_PERIOD - (now - lastOtpRequest)) / 1000)} seconds before requesting another OTP`))
      return;
    }

    setLastOtpRequest(now);
    dispatch(savePhone(phone));
    dispatch(sendOtp(phone));
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value !== '' && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (!showOtpVerify) handleLogin();
      else handleVerify();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4) {
      const data = { phone, otp: otpCode };
      dispatch(createPatientLogin(data));
    }
  };

  const handleRetry = () => {
    if (timer === 0) {
      setTimer(OTP_RESEND_TIMEOUT);
      setIsInputDisabled(false);
      setOtp(['', '', '', '']);
      dispatch(sendOtp(phone));
      inputRefs[0].current.focus();
    }
  };

  useEffect(() => {
    if (showOtpVerify) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showOtpVerify]);

  useEffect(() => {
    setIsInputDisabled(timer === 0);
  }, [timer]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(errorClean());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    
    if (success) {
      setShowOtpVerify(true);
      setTimer(OTP_RESEND_TIMEOUT);
      setIsInputDisabled(false);
    }
  }, [isAuthenticated, success, navigate]);

  useEffect(() => {
    if (showOtpVerify && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs, showOtpVerify]);

  const HeaderSection = () => (
    <Box sx={{ mb: { xs: 4, sm: 5, md: 6 }, alignSelf: 'flex-start' }}>
      <img
        src={logo}
        alt="Doctor Logo"
        style={{
          width: isMobile ? '80px' : '110px',
          height: 'auto'
        }}
      />
    </Box>
  );

  const TitleSection = () => (
    <Box sx={{ mb: { xs: 3, sm: 4 } }}>
      <Typography
        variant={isMobile ? "h6" : "h5"}
        component="h2"
        sx={{
          display: 'inline-block',
          borderBottom: `2px solid #0052A8`,
          paddingBottom: 0.5,
          marginBottom: 2,
          fontSize: { xs: '24px', sm: '30px', md: '35px' },
          fontWeight: showOtpVerify ? 500 : 700,
          color: '#0052A8'
        }}
      >
        {showOtpVerify ? 'OTP Verification' : 'Login'}
      </Typography>

      <Typography
        variant={isMobile ? "h6" : "h3"}
        component="h3"
        sx={{
          fontWeight: 700,
          mb: 0.5,
          color: '#375560',
          textAlign: 'left',
          fontSize: { xs: '24px', sm: '30px', md: '35px' },
          lineHeight: { xs: '32px', sm: '42px', md: '52px' },
          textTransform: 'capitalize',
          letterSpacing: '0%'
        }}
      >
        Premium Telemedicine Platform
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: 3,
          color: '#0052A8',
          fontWeight: 700,
          textAlign: 'left',
          fontSize: { xs: '16px', sm: '19px', md: '22px' },
          lineHeight: '22px',
          letterSpacing: '0%'
        }}
      >
        Video consultation 24 x7
      </Typography>
    </Box>
  );

  const PhoneLoginForm = () => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="body2"
        color="#375560"
        sx={{
          mb: 2,
          textAlign: 'left',
          fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
        }}
      >
        Talk to a doctor, therapist or medical expert anywhere you are by phone or video.
      </Typography>

      <TextField
        fullWidth
        placeholder="017XXXXXXXX"
        value={phone}
        onChange={handlePhoneChange}
        onKeyPress={handleKeyPress}
        margin="normal"
        variant="outlined"
        sx={{
          mb: 3,
          mt: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#F9F9F9',
            '&:hover fieldset': {
              borderColor: '#0052A8',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#0052A8',
            },
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              +880
            </InputAdornment>
          ),
        }}
      />

      <Button
        fullWidth
        variant="contained"
        onClick={handleLogin}
        disabled={!isValidPhone(phone) || isLoading}
        sx={{
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: { xs: '0.9rem', sm: '1rem' },
          backgroundColor: isValidPhone(phone) && !isLoading ? '#0052A8' : undefined,
          '&:hover': {
            backgroundColor: isValidPhone(phone) && !isLoading ? '#00438a' : undefined,
          }
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login Now'}
      </Button>
    </Box>
  );

  const OtpVerificationForm = () => (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="body2"
        color="#375560"
        sx={{
          mb: 2,
          textAlign: 'left',
          fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' }
        }}
      >
        Please enter the OTP sent to{' '}
        <Typography
          component="span"
          sx={{ color: '#0052A8', fontWeight: 500 }}
        >
          {phone}
        </Typography>
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        {otp.map((digit, index) => (
          <TextField
            key={index}
            inputRef={inputRefs[index]}
            variant="outlined"
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: '1.25rem',
                padding: '10px 0'
              }
            }}
            sx={{
              width: '60px',
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? '#d32f2f' : '#0052A8',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: error ? '#d32f2f' : '#0052A8',
                },
              }
            }}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            disabled={isInputDisabled || isLoading}
            error={error}
          />
        ))}
      </Stack>

      <Button
        fullWidth
        variant="contained"
        onClick={handleVerify}
        disabled={isInputDisabled || isLoading || otp.some(digit => digit === '')}
        sx={{
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: { xs: '0.9rem', sm: '1rem' },
          backgroundColor: !isInputDisabled && !isLoading && !otp.some(digit => digit === '') ? '#0052A8' : undefined,
          '&:hover': {
            backgroundColor: !isInputDisabled && !isLoading && !otp.some(digit => digit === '') ? '#00438a' : undefined,
          }
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify'}
      </Button>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Did not receive OTP?{' '}
          <Button
            variant="text"
            disabled={timer > 0}
            onClick={handleRetry}
            sx={{
              color: timer === 0 ? '#0052A8' : 'text.disabled',
              fontWeight: 500,
              minWidth: 'auto',
              padding: 0,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            Resend OTP
          </Button>
          {timer > 0 && ` (${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60})`}
        </Typography>
      </Box>
    </Box>
  );

  const FooterSection = () => (
    <Box sx={{ mt: { xs: 4, sm: 5, md: 6 } }}>
      <Divider sx={{ my: 2 }} />
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="body2">
          <Link
            href="#"
            color="#0052A8"
            underline="hover"
            sx={{ fontWeight: 500 }}
          >
            Learn more
          </Link>
          <Typography component="span" variant="body2" color="#375560">
            {' '}about our telemedicine platform
          </Typography>
        </Typography>
      </Box>
    </Box>
  );

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
            <HeaderSection />
            <TitleSection />
            
            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ textAlign: 'left', mb: 2 }}
              >
                {errorMessage}
              </Typography>
            )}

            {!showOtpVerify ? <PhoneLoginForm /> : <OtpVerificationForm />}
            <FooterSection />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;