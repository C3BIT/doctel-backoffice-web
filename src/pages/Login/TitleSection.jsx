import { Box, Typography } from '@mui/material';

const TitleSection = ({ isMobile, showOtpVerify }) => (
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

export default TitleSection;