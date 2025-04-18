import { Box } from '@mui/material';
import logo from '../../assets/images/Logo.svg';
import PropTypes from 'prop-types';

const HeaderSection = ({ isMobile }) => (
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
HeaderSection.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default HeaderSection;