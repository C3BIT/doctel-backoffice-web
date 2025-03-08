import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Link,
  useMediaQuery,
  InputAdornment,
  Paper,
  Divider
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../../assets/logo.png';

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
});

const DoctorProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const { isLoading, error, errorMessage } = useSelector((state) => state.user || { isLoading: false, error: false, errorMessage: '' });

  const handleUpdate = () => {
    console.log('Profile Updated:', { name, dob });
  };

  const handleSkip = () => {
    navigate('/');
  };

  useEffect(() => {
    if (error) {
      // Handle error similar to login screen
    }
  }, [error, dispatch]);

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
                  fontSize: { xs: '16px', sm: '18px' },
                  fontWeight: 700,
                  color: '#0052A8',
                  textTransform: 'uppercase'
                }}
              >
                Update Profile
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
                Tell us few details about you so that we can serve you better
              </Typography>

              <TextField
                fullWidth
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                variant="outlined"
                sx={{
                  mb: 2,
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
                      <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                placeholder="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{
                  mb: 3,
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
                      <CalendarTodayIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleUpdate}
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  backgroundColor: !isLoading ? '#0052A8' : undefined,
                  '&:hover': {
                    backgroundColor: !isLoading ? '#00438a' : undefined,
                  },
                  mb: 2
                }}
              >
                {isLoading ? 'Loading...' : 'Update'}
              </Button>

              <Box sx={{ textAlign: 'right' }}>
                <Link 
                  onClick={handleSkip} 
                  color="#0052A8"
                  underline="hover"
                  sx={{ 
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Skip
                </Link>
              </Box>

              {error && (
                <Typography 
                  variant="body2" 
                  color="error"
                  sx={{ mt: 1, textAlign: 'left' }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Box>

            <Box sx={{ mt: { xs: 4, sm: 5 } }}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ textAlign: 'center' }}>
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

export default DoctorProfile;