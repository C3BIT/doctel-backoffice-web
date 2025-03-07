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
  Paper,
  Stack
} from '@mui/material';
import { errorClean, createPatientLogin } from '../../redux/auth/authSlice';
import logo from '../../assets/logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Loader from '../../components/loader/Loader';

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

const OtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(150);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const phone = localStorage.getItem('phone');
  const { isAuthenticated, isLoading, error, errorMessage } = useSelector((state) => state.user);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);
    
    if (timer === 0) {
      setIsInputDisabled(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = () => {
    const otpCode = otp.join('');
    const data = { phone, otp: otpCode };
    dispatch(createPatientLogin(data));
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(errorClean());
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

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
        <Loader open={isLoading}/>
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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

          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 2,
              backgroundColor: 'white',
              width: '100%'
            }}
          >
            <Box sx={{ mb: { xs: 3, sm: 4 } }}>
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                component="h2"
                sx={{
                  display: 'inline-block',
                  borderBottom: `2px solid #0052A8`,
                  paddingBottom: 0.5,
                  marginBottom: 2,
                  fontWeight: 500,
                  color: '#0052A8'
                }}
              >
                OTP
              </Typography>
              
              <Typography 
                variant={isMobile ? "h6" : "h3"}
                component="h3"
                sx={{ 
                  fontWeight: 700, 
                  mb: 0.5,
                  color: '#375560',
                  textAlign: 'left',
                  fontSize: { xs: '24px', sm: '32px', md: '40px' },
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
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
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
                Verify
              </Button>
            </Box>

            <Box sx={{ height: '24px', mb: 1 }}>
              {error && (
                <Typography 
                  variant="body2" 
                  color="error"
                  sx={{ textAlign: 'left' }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Box>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Did not receive OTP?{' '}
                <Typography 
                  component="span" 
                  sx={{ 
                    color: '#0052A8', 
                    fontWeight: 500,
                    cursor: timer === 0 ? 'pointer' : 'default',
                    opacity: timer === 0 ? 1 : 0.7
                  }}
                >
                  Retry
                </Typography>{' '}
                in {timer} sec
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 4, sm: 5 } }}>
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
                    {' '}about MyDoc
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default OtpVerify;