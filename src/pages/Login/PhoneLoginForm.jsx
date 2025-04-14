import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { savePhone, sendOtp } from '../../redux/auth/authSlice';
import showToast from '../../utils/toast';
import PropTypes from 'prop-types';

const OTP_COOLDOWN_PERIOD = 30000;

const PhoneLoginForm = ({ phone, setPhone, isLoading }) => {
    const dispatch = useDispatch();
    const [lastOtpRequest, setLastOtpRequest] = useState(0);

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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

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
                            +88
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
};
PhoneLoginForm.propTypes = {
    phone: PropTypes.string.isRequired,
    setPhone: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};

PhoneLoginForm.defaultProps = {
    isLoading: false
};
export default PhoneLoginForm;
