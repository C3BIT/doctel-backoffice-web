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
  resetState,
} from '../../redux/auth/authSlice';
import logo from '../../assets/images/Logo.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from '../../components/loader/Loader';
import showToast from '../../utils/toast';
import { createRef } from 'react';

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
const OTP_LENGTH = 4;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isAuthenticated, isLoading, success, error, errorMessage } = useSelector((state) => state.user);

  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(OTP_RESEND_TIMEOUT);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [lastOtpRequest, setLastOtpRequest] = useState(0);
  const [focusLocked, setFocusLocked] = useState(false);

  const inputRefs = useRef([]);
  useEffect(() => {
    inputRefs.current = Array(OTP_LENGTH).fill().map((_, i) => inputRefs.current[i] || createRef());
  }, []);

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
      showToast('error', "Please enter a valid Bangladeshi phone number (e.g. 01712345678)");
      return;
    }

    const now = Date.now();
    if (now - lastOtpRequest < OTP_COOLDOWN_PERIOD) {
      const waitTime = Math.ceil((OTP_COOLDOWN_PERIOD - (now - lastOtpRequest)) / 1000);
      showToast('error', `Please wait ${waitTime} seconds before requesting another OTP`);
      return;
    }

    setLastOtpRequest(now);
    dispatch(savePhone(phone));
    dispatch(sendOtp(phone));
  };

  const handleOtpChange = (index, value) => {
    if (value === '' || /^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value !== '' && index < OTP_LENGTH - 1) {
        inputRefs.current[index + 1].current?.focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.split('').slice(0, OTP_LENGTH);
      const newOtp = [...otp];
      
      digits.forEach((digit, index) => {
        if (index < OTP_LENGTH) {
          newOtp[index] = digit;
        }
      });
      
      setOtp(newOtp);
      
      const nextFocusIndex = Math.min(digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextFocusIndex].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        inputRefs.current[index - 1].current?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      } else if (otp[index] !== '') {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
    
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].current?.focus();
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].current?.focus();
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
    if (otpCode.length === OTP_LENGTH) {
      const data = { phone: phone || localStorage.getItem("phone"), otp: otpCode };
      if(data.phone && data.otp){
        dispatch(createPatientLogin(data));
      }
    } else {
      showToast('error', 'Please enter all digits of the OTP');
    }
  };

  const handleRetry = () => {
    if (timer === 0) {
      setTimer(OTP_RESEND_TIMEOUT);
      setIsInputDisabled(false);
      setOtp(Array(OTP_LENGTH).fill(''));
      dispatch(sendOtp(phone));
      
      setFocusLocked(true);
      setTimeout(() => {
        inputRefs.current[0].current?.focus();
        setFocusLocked(false);
      }, 100);
    }
  };

  const handleClear = () => {
    setShowOtpVerify(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    setIsInputDisabled(false);
    dispatch(resetState());
    showToast('info', 'Verification cancelled. You can try again.');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    let interval;
    if (showOtpVerify && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOtpVerify, timer]);

  useEffect(() => {
    setIsInputDisabled(timer === 0);
  }, [timer]);

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
    
    if (success) {
      setShowOtpVerify(true);
      setTimer(OTP_RESEND_TIMEOUT);
      setIsInputDisabled(false);
      setOtp(Array(OTP_LENGTH).fill(''));
      
      setFocusLocked(true);
      setTimeout(() => {
        inputRefs.current[0].current?.focus();
        setFocusLocked(false);
      }, 100);
      
      showToast('success', 'OTP sent successfully');
    }
  }, [isAuthenticated, success, navigate, dispatch]);

  useEffect(() => {
    if (showOtpVerify && !focusLocked) {
      const focusTimer = setTimeout(() => {
        inputRefs.current[0].current?.focus();
      }, 100);
      return () => clearTimeout(focusTimer);
    }
  }, [showOtpVerify, focusLocked]);

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
          +88{phone || localStorage.getItem("phone")}
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
            inputRef={inputRefs.current[index]}
            variant="outlined"
            autoComplete="off"
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 600,
                padding: '10px 0',
                caretColor: '#0052A8'
              },
              'aria-label': `OTP digit ${index + 1}`,
            }}
            sx={{
              width: '60px',
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#F9F9F9',
                transition: 'all 0.2s ease-in-out',
                '&.Mui-focused': {
                  transform: 'scale(1.05)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0052A8',
                    borderWidth: '2px',
                  },
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0052A8',
                },
              }
            }}
            value={digit}
            onChange={(e) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(index, e)}
            onPaste={index === 0 ? handleOtpPaste : undefined}
            disabled={isInputDisabled || isLoading}
            onFocus={(e) => e.target.select()}
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

      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          mt: 3,
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Did not receive OTP?
          </Typography>
          <Button
            variant="text"
            disabled={timer > 0}
            onClick={handleRetry}
            sx={{
              color: timer === 0 ? '#0052A8' : 'text.disabled',
              fontWeight: 500,
              minWidth: 'auto',
              padding: '0 8px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                textDecoration: 'underline'
              }
            }}
          >
            {timer > 0 ? `Resend in ${formatTime(timer)}` : 'Resend OTP'}
          </Button>
        </Box>
        
        <Button
          variant="text"
          onClick={handleClear}
          sx={{
            color: '#757575',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
              color: '#555555'
            }
          }}
        >
          Clear and go back
        </Button>
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
            
            {!showOtpVerify ? <PhoneLoginForm /> : <OtpVerificationForm />}
            <FooterSection />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Login;