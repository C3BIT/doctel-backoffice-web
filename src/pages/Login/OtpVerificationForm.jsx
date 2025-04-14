import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { createPatientLogin, sendOtp } from '../../redux/auth/authSlice';
import showToast from '../../utils/toast';
import PropTypes from 'prop-types';
import { InputOtp } from 'primereact/inputotp';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

const OTP_LENGTH = 4;
const OTP_RESEND_TIMEOUT = 150;

const OtpVerificationForm = ({ phone, handleClear, isLoading }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [timer, setTimer] = useState(OTP_RESEND_TIMEOUT);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const otpRef = useRef(null); 

  const handleVerify = () => {
    const trimmedToken = token?.toString().trim();
    if (trimmedToken.length === OTP_LENGTH && /^\d+$/.test(trimmedToken)) {
      const data = {
        phone: phone || localStorage.getItem("phone"),
        otp: trimmedToken
      };
      if (data.phone && data.otp) {
        dispatch(createPatientLogin(data));
      }
    } else {
      showToast('error', 'Please enter all digits of the OTP');
    }
  };

  const handleRetry = () => {
    if (timer === 0) {
      setTimer(OTP_RESEND_TIMEOUT);
      setToken('');
      dispatch(sendOtp(phone || localStorage.getItem("phone")));
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    setIsInputDisabled(timer === 0);
  }, [timer]);

  useEffect(() => {
    if (otpRef.current) {
      const input = otpRef.current.querySelector('input');
      input?.focus();
    }
  }, []);

  return (
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

      <Box
        ref={otpRef}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          borderRadius: 2,
          bgcolor: 'background.paper',
          mb: 3,
        }}
      >
        <InputOtp
          length={OTP_LENGTH}
          value={token}
          onChange={(e) => {
            const value = e.value.replace(/\D/g, '');
            setToken(value);
          }}
          disabled={isInputDisabled || isLoading}
          integerOnly
        />
      </Box>

      <Button
        fullWidth
        variant="contained"
        onClick={handleVerify}
        disabled={
          isInputDisabled || isLoading || token.length !== OTP_LENGTH
        }
        sx={{
          py: 1.5,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: { xs: '0.9rem', sm: '1rem' },
          backgroundColor:
            !isInputDisabled && !isLoading && token.length === OTP_LENGTH
              ? '#0052A8'
              : undefined,
          '&:hover': {
            backgroundColor:
              !isInputDisabled && !isLoading && token.length === OTP_LENGTH
                ? '#00438a'
                : undefined,
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
};

OtpVerificationForm.propTypes = {
  phone: PropTypes.string,
  handleClear: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default OtpVerificationForm;
