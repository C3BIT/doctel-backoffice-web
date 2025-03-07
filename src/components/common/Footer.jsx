import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#375560',
  padding: theme.spacing(2, 0),
  width: '100%',
  marginTop: 'auto',
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.grey[300],
  },
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterWrapper component="footer">
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="body2" color="white">
            © {currentYear} || All rights reserved by MyDoc
          </Typography>
          
          <Stack direction="row" spacing={1}>
            <SocialIcon size="small" aria-label="facebook">
              <FacebookIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon size="small" aria-label="twitter">
              <TwitterIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon size="small" aria-label="youtube">
              <YouTubeIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon size="small" aria-label="linkedin">
              <LinkedInIcon fontSize="small" />
            </SocialIcon>
            <SocialIcon size="small" aria-label="whatsapp">
              <WhatsAppIcon fontSize="small" />
            </SocialIcon>
          </Stack>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;